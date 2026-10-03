<script lang="ts">
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  type PixelVariant = 'square' | 'circle' | 'triangle' | 'diamond';

  interface Props {
    variant?: PixelVariant;
    pixelSize?: number;
    color?: string;
    patternScale?: number;
    patternDensity?: number;
    pixelSizeJitter?: number;
    enableRipples?: boolean;
    rippleSpeed?: number;
    rippleThickness?: number;
    rippleIntensityScale?: number;
    speed?: number;
    edgeFade?: number;
    transparent?: boolean;
  }
  let {
    variant = 'square',
    pixelSize = 2,
    color = '#595959',
    patternScale = 20,
    patternDensity = 5,
    pixelSizeJitter = 0,
    enableRipples = false,
    rippleSpeed = 0.4,
    rippleThickness = 0.12,
    rippleIntensityScale = 1.5,
    speed = 0.5,
    edgeFade = 0.20,
    transparent = true
  }: Props = $props();

  let container: HTMLDivElement;

  const SHAPE_MAP: Record<PixelVariant, number> = {
    square: 0,
    circle: 1,
    triangle: 2,
    diamond: 3
  };

  const MAX_CLICKS = 10;

  const vertexShader = `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;

    uniform vec3 uColor;
    uniform vec2 uResolution;
    uniform float uTime;
    uniform float uPixelSize;
    uniform float uScale;
    uniform float uDensity;
    uniform float uPixelJitter;

    uniform int uEnableRipples;
    uniform float uRippleSpeed;
    uniform float uRippleThickness;
    uniform float uRippleIntensity;
    uniform float uEdgeFade;
    uniform int uShapeType;

    const int SHAPE_SQUARE = 0;
    const int SHAPE_CIRCLE = 1;
    const int SHAPE_TRIANGLE = 2;
    const int SHAPE_DIAMOND = 3;

    const int MAX_CLICKS = 10;

    uniform vec2 uClickPos[MAX_CLICKS];
    uniform float uClickTimes[MAX_CLICKS];

    out vec4 fragColor;

    float Bayer2(vec2 a) {
      a = floor(a);

      return fract(
        a.x / 2.0 +
        a.y * a.y * 0.75
      );
    }

    #define Bayer4(a) (Bayer2(.5 * (a)) * 0.25 + Bayer2(a))
    #define Bayer8(a) (Bayer4(.5 * (a)) * 0.25 + Bayer2(a))

    float hash11(float n) {
      return fract(sin(n) * 43758.5453);
    }

    float vnoise(vec3 p) {
      vec3 ip = floor(p);
      vec3 fp = fract(p);

      float n000 = hash11(
        dot(ip + vec3(0.0, 0.0, 0.0),
        vec3(1.0, 57.0, 113.0))
      );

      float n100 = hash11(
        dot(ip + vec3(1.0, 0.0, 0.0),
        vec3(1.0, 57.0, 113.0))
      );

      float n010 = hash11(
        dot(ip + vec3(0.0, 1.0, 0.0),
        vec3(1.0, 57.0, 113.0))
      );

      float n110 = hash11(
        dot(ip + vec3(1.0, 1.0, 0.0),
        vec3(1.0, 57.0, 113.0))
      );

      float n001 = hash11(
        dot(ip + vec3(0.0, 0.0, 1.0),
        vec3(1.0, 57.0, 113.0))
      );

      float n101 = hash11(
        dot(ip + vec3(1.0, 0.0, 1.0),
        vec3(1.0, 57.0, 113.0))
      );

      float n011 = hash11(
        dot(ip + vec3(0.0, 1.0, 1.0),
        vec3(1.0, 57.0, 113.0))
      );

      float n111 = hash11(
        dot(ip + vec3(1.0, 1.0, 1.0),
        vec3(1.0, 57.0, 113.0))
      );

      vec3 w = fp * fp * fp *
        (fp * (fp * 6.0 - 15.0) + 10.0);

      float x00 = mix(n000, n100, w.x);
      float x10 = mix(n010, n110, w.x);

      float x01 = mix(n001, n101, w.x);
      float x11 = mix(n011, n111, w.x);

      float y0 = mix(x00, x10, w.y);
      float y1 = mix(x01, x11, w.y);

      return mix(y0, y1, w.z) * 2.0 - 1.0;
    }

    float fbm2(vec2 uv, float t) {
      vec3 p = vec3(uv * uScale, t);

      float amp = 1.0;
      float freq = 1.0;
      float sum = 1.0;

      for (int i = 0; i < 5; ++i) {
        sum += amp * vnoise(p * freq);

        freq *= 1.25;
        amp *= 1.0;
      }

      return sum * 0.5 + 0.5;
    }

    float maskCircle(vec2 p, float cov) {
      float r = sqrt(cov) * 0.25;

      float d = length(p - 0.5) - r;

      float aa = 0.5 * fwidth(d);

      return cov *
        (1.0 - smoothstep(-aa, aa, d * 2.0));
    }

    float maskTriangle(
      vec2 p,
      vec2 id,
      float cov
    ) {
      bool flip =
        mod(id.x + id.y, 2.0) > 0.5;

      if (flip) {
        p.x = 1.0 - p.x;
      }

      float r = sqrt(cov);

      float d =
        p.y - r * (1.0 - p.x);

      float aa = fwidth(d);

      return cov *
        clamp(
          0.5 - d / aa,
          0.0,
          1.0
        );
    }

    float maskDiamond(
      vec2 p,
      float cov
    ) {
      float r = sqrt(cov) * 0.564;

      return step(
        abs(p.x - 0.49) +
        abs(p.y - 0.49),
        r
      );
    }

    void main() {

      float pixelSize = uPixelSize;

      vec2 fragCoord =
        gl_FragCoord.xy -
        uResolution * 0.5;

      float aspectRatio =
        uResolution.x /
        uResolution.y;

      vec2 pixelId =
        floor(fragCoord / pixelSize);

      vec2 pixelUV =
        fract(fragCoord / pixelSize);

      float cellPixelSize =
        8.0 * pixelSize;

      vec2 cellId =
        floor(fragCoord / cellPixelSize);

      vec2 cellCoord =
        cellId * cellPixelSize;

      vec2 uv =
        cellCoord /
        uResolution *
        vec2(aspectRatio, 1.0);

      float base =
        fbm2(
          uv,
          uTime * 0.05
        );

      base =
        base * 0.5 - 0.65;

      float feed =
        base +
        (uDensity - 0.5) * 0.3;

      float speed =
        uRippleSpeed;

      float thickness =
        uRippleThickness;

      if (uEnableRipples == 1) {

        for (int i = 0; i < MAX_CLICKS; ++i) {

          vec2 pos =
            uClickPos[i];

          if (pos.x < 0.0) {
            continue;
          }

          vec2 cuv =
            (
              (
                pos -
                uResolution * 0.5 -
                cellPixelSize * 0.5
              )
              / uResolution
            )
            *
            vec2(aspectRatio, 1.0);
          float t =
            max(
              uTime -
              uClickTimes[i],
              0.0
            );

          float r =
            distance(uv, cuv);

          float waveR =
            speed * t;

          float ring =
            exp(
              -pow(
                (r - waveR) /
                thickness,
                2.0
              )
            );

          float atten =
            exp(-t) *
            exp(-10.0 * r);

          feed =
            max(
              feed,
              ring *
              atten *
              uRippleIntensity
            );
        }
      }
      float bayer =
        Bayer8(
          fragCoord / uPixelSize
        ) - 0.5;

      float bw =
        step(
          0.5,
          feed + bayer
        );

      float h =
        fract(
          sin(
            dot(
              floor(
                fragCoord /
                uPixelSize
              ),
              vec2(127.1, 311.7)
            )
          )
          * 43758.5453
        );

      float jitterScale =
        1.0 +
        (h - 0.5) *
        uPixelJitter;

      float coverage =
        bw * jitterScale;

      float M;

      if (
        uShapeType ==
        SHAPE_CIRCLE
      ) {
        M =
          maskCircle(
            pixelUV,
            coverage
          );
      }

      else if (
        uShapeType ==
        SHAPE_TRIANGLE
      ) {
        M =
          maskTriangle(
            pixelUV,
            pixelId,
            coverage
          );
      }

      else if (
        uShapeType ==
        SHAPE_DIAMOND
      ) {
        M =
          maskDiamond(
            pixelUV,
            coverage
          );
      }

      else {
        M = coverage;
      }

      if (uEdgeFade > 0.0) {

        vec2 norm =
          gl_FragCoord.xy /
          uResolution;

        float edge =
          min(
            min(norm.x, norm.y),
            min(
              1.0 - norm.x,
              1.0 - norm.y
            )
          );

        float fade =
          smoothstep(
            0.0,
            uEdgeFade,
            edge
          );

        M *= fade;
      }

      vec3 srgbColor =
        mix(
          uColor * 12.92,
          1.055 *
            pow(
              uColor,
              vec3(1.0 / 2.4)
            ) - 0.055,
          step(
            0.0031308,
            uColor
          )
        );

      fragColor =
        vec4(
          srgbColor,
          M
        );
    }
  `;

  onMount(() => {
    if (!container) return;

    const renderer =
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference:
          'high-performance'
      });

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio || 1,
        2
      )
    );

    renderer.domElement.style.width =
      '100%';

    renderer.domElement.style.height =
      '100%';

    container.appendChild(
      renderer.domElement
    );

    if (transparent) {
      renderer.setClearAlpha(0);
    }

    const scene =
      new THREE.Scene();

    const camera =
      new THREE.OrthographicCamera(
        -1,
        1,
        1,
        -1,
        0,
        1
      );

    const uniforms = {
      uResolution: {
        value:
          new THREE.Vector2()
      },

      uTime: {
        value: 0
      },

      uColor: {
        value:
          new THREE.Color(color)
      },

      uPixelSize: {
        value:
          pixelSize *
          renderer.getPixelRatio()
      },

      uScale: {
        value: patternScale
      },

      uDensity: {
        value: patternDensity
      },

      uPixelJitter: {
        value: pixelSizeJitter
      },

      uEnableRipples: {
        value:
          enableRipples ? 1 : 0
      },

      uRippleSpeed: {
        value: rippleSpeed
      },

      uRippleThickness: {
        value: rippleThickness
      },

      uRippleIntensity: {
        value:
          rippleIntensityScale
      },

      uEdgeFade: {
        value: edgeFade
      },

      uShapeType: {
        value:
          SHAPE_MAP[variant]
      },

      uClickPos: {
        value:
          Array.from(
            {
              length: MAX_CLICKS
            },
            () =>
              new THREE.Vector2(
                -1,
                -1
              )
          )
      },
      uClickTimes: {
        value:
          new Float32Array(
            MAX_CLICKS
          )
      }
    };
    const material =
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
        transparent: true,
        depthTest: false,
        depthWrite: false,

        glslVersion:
          THREE.GLSL3
      });
    const geometry =
      new THREE.PlaneGeometry(
        2,
        2
      );
    const mesh =
      new THREE.Mesh(
        geometry,
        material
      );
    scene.add(mesh);
    const resize = () => {

      const width =
        container.clientWidth || 1;

      const height =
        container.clientHeight || 1;

      renderer.setSize(
        width,
        height,
        false
      );

      uniforms.uResolution.value.set(
        renderer.domElement.width,
        renderer.domElement.height
      );

      uniforms.uPixelSize.value =
        pixelSize *
        renderer.getPixelRatio();
    };

    resize();

    const resizeObserver =
      new ResizeObserver(
        resize
      );

    resizeObserver.observe(
      container
    );

    let clickIndex = 0;

    const getPointerPosition = (
      event: PointerEvent
    ) => {

      const rect =
        renderer.domElement
          .getBoundingClientRect();

      const scaleX =
        renderer.domElement.width /
        rect.width;

      const scaleY =
        renderer.domElement.height /
        rect.height;

      const x =
        (event.clientX -
          rect.left) *
        scaleX;

      const y =
        (rect.height -
          (event.clientY -
            rect.top)) *
        scaleY;

      return { x, y };
    };

    const handlePointerDown = (
      event: PointerEvent
    ) => {
      if (!enableRipples) return;
      const {
        x,
        y
      } =
        getPointerPosition(
          event
        );
      uniforms
        .uClickPos
        .value[clickIndex]
        .set(x, y);
      uniforms
        .uClickTimes
        .value[clickIndex] =
        uniforms.uTime.value;
      clickIndex =
        (clickIndex + 1) %
        MAX_CLICKS;
    };
    window.addEventListener(
      'pointerdown',
      handlePointerDown
    );
    const clock =
      new THREE.Clock();

    let animationFrame = 0;
    const animate = () => {
      uniforms.uTime.value =
        clock.getElapsedTime() *
        speed;

      renderer.render(
        scene,
        camera
      );

      animationFrame =
        requestAnimationFrame(
          animate
        );
    };

    animate();

    return () => {
      cancelAnimationFrame(
        animationFrame
      );
      resizeObserver.disconnect();
      window.removeEventListener(
        'pointerdown',
        handlePointerDown
      );
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (
        renderer.domElement
          .parentElement ===
        container
      ) {
        container.removeChild(
          renderer.domElement
        );
      }
    };
  });
</script>
<div
  bind:this={container}
  class="pixel-blast"
  aria-hidden="true"
></div>

<style>
  .pixel-blast {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  background: #EBEDF0;
}
</style>