// Many rendering functions are declared in variable `o` in line 208
// Colors are degined as `p` in line 192. Author: Kim Asendorf

! function n(i, o, a) {
    function s(t, e) {
        if (!o[t]) {
            if (!i[t]) {
                var r = "function" == typeof require && require;
                if (!e && r) return r(t, !0);
                if (f) return f(t, !0);
                throw (r = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", r
            }
            r = o[t] = {
                exports: {}
            }, i[t][0].call(r.exports, function(e) {
                return s(i[t][1][e] || e)
            }, r, r.exports, n, i, o, a)
        }
        return o[t].exports
    }
    for (var f = "function" == typeof require && require, e = 0; e < a.length; e++) s(a[e]);
    return s
}({
    1: [function(e, t, r) {
        "use strict";
        var n, i = e("webgl-context")({
                antialias: !1
            }),
            o = (e("gl-reset")(i), e("./lib/app-default")),
            a = document.getElementById("screen"),
            s = document.getElementById("loading");
        window.addEventListener("load", function() {
            n = o(i, a), a.appendChild(n.canvas), s.style.display = "none"
        }, !1)
    }, {
        "./lib/app-default": 2,
        "gl-reset": 25,
        "webgl-context": 70
    }],
    2: [function(e, t, r) {
        "use strict";

        function d(e, t) {
            var r = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (!r) {
                if (Array.isArray(e) || (r = s(e)) || t && e && "number" == typeof e.length) {
                    r && (e = r);
                    var n = 0,
                        t = function() {};
                    return {
                        s: t,
                        n: function() {
                            return n >= e.length ? {
                                done: !0
                            } : {
                                done: !1,
                                value: e[n++]
                            }
                        },
                        e: function(e) {
                            throw e
                        },
                        f: t
                    }
                }
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            var i, o = !0,
                a = !1;
            return {
                s: function() {
                    r = r.call(e)
                },
                n: function() {
                    var e = r.next();
                    return o = e.done, e
                },
                e: function(e) {
                    a = !0, i = e
                },
                f: function() {
                    try {
                        o || null == r.return || r.return()
                    } finally {
                        if (a) throw i
                    }
                }
            }
        }

        function y(e, t) {
            return function(e) {
                if (Array.isArray(e)) return e
            }(e) || function(e, t) {
                var r = null == e ? null : "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (null != r) {
                    var n, i, o = [],
                        a = !0,
                        s = !1;
                    try {
                        for (r = r.call(e); !(a = (n = r.next()).done) && (o.push(n.value), !t || o.length !== t); a = !0);
                    } catch (e) {
                        s = !0, i = e
                    } finally {
                        try {
                            a || null == r.return || r.return()
                        } finally {
                            if (s) throw i
                        }
                    }
                    return o
                }
            }(e, t) || s(e, t) || function() {
                throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function s(e, t) {
            if (e) {
                if ("string" == typeof e) return n(e, t);
                var r = Object.prototype.toString.call(e).slice(8, -1);
                return "Map" === (r = "Object" === r && e.constructor ? e.constructor.name : r) || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(e, t) : void 0
            }
        }

        function n(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }
        var _ = e("./app"),
            x = e("object-assign"),
            m = e("gl-fbo"),
            E = e("gl-shader"),
            b = e("gl-texture2d"),
            i = e("glslify"),
            w = e("ndarray"),
            A = e("ndarray-fill"),
            T = e("a-big-triangle"),
            R = e("./grid-generator"),
            P = i(["#define GLSLIFY 1\nattribute vec2 position;\n\nvarying vec2 vUv;\n\nvoid main() {\n  gl_Position = vec4(position, 0.0, 1.0);\n  vUv = 0.5 * (position + 1.0);\n}"]),
            I = i(['precision highp float;\n#define GLSLIFY 1\n\nuniform sampler2D buffer;\nuniform sampler2D tex;\nuniform vec2 dims;\nuniform float time;\n\nuniform vec4 rect0;\nuniform vec4 rect1;\nuniform vec4 rect2;\nuniform vec4 rect3;\nuniform vec4 rect4;\nuniform vec4 rect5;\nuniform vec4 rect6;\nuniform vec4 rect7;\nuniform vec4 rect8;\nuniform vec4 rect9;\nuniform vec4 rect10;\nuniform vec4 rect11;\nuniform vec4 rect12;\nuniform vec4 rect13;\nuniform vec4 rect14;\nuniform vec4 rect15;\n\nvarying vec2 vUv;\n\n//#pragma glslify: cellular2D = require(\'./cellular2D\')\n// Cellular noise ("Worley noise") in 2D in GLSL.\n// Copyright (c) Stefan Gustavson 2011-04-19. All rights reserved.\n// This code is released under the conditions of the MIT license.\n// See LICENSE file for details.\n// https://github.com/stegu/webgl-noise\n\n// Modulo 289 without a division (only multiplications)\nvec2 mod289_7(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_7(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\n// Modulo 7 without a division\nvec4 mod7(vec4 x) {\n  return x - floor(x * (1.0 / 7.0)) * 7.0;\n}\n\n// Permutation polynomial: (34x^2 + x) mod 289\nvec4 permute_7(vec4 x) {\n  return mod289_7((34.0 * x + 1.0) * x);\n}\n\n// Cellular noise, returning F1 and F2 in a vec2.\n// Speeded up by using 2x2 search window instead of 3x3,\n// at the expense of some strong pattern artifacts.\n// F2 is often wrong and has sharp discontinuities.\n// If you need a smooth F2, use the slower 3x3 version.\n// F1 is sometimes wrong, too, but OK for most purposes.\nvec2 cellular2x2(vec2 P) {\n#define K 0.142857142857 // 1/7\n#define K2 0.0714285714285 // K/2\n#define jitter 0.8 // jitter 1.0 makes F1 wrong more often\n  vec2 Pi = mod289_7(floor(P));\n  vec2 Pf = fract(P);\n  vec4 Pfx = Pf.x + vec4(-0.5, -1.5, -0.5, -1.5);\n  vec4 Pfy = Pf.y + vec4(-0.5, -0.5, -1.5, -1.5);\n  vec4 p = permute_7(Pi.x + vec4(0.0, 1.0, 0.0, 1.0));\n  p = permute_7(p + Pi.y + vec4(0.0, 0.0, 1.0, 1.0));\n  vec4 ox = mod7(p)*K+K2;\n  vec4 oy = mod7(floor(p*K))*K+K2;\n  vec4 dx = Pfx + jitter*ox;\n  vec4 dy = Pfy + jitter*oy;\n  vec4 d = dx * dx + dy * dy; // d11, d12, d21 and d22, squared\n  // Sort out the two smallest distances\n#if 0\n  // Cheat and pick only F1\n  d.xy = min(d.xy, d.zw);\n  d.x = min(d.x, d.y);\n  return vec2(sqrt(d.x)); // F1 duplicated, F2 not computed\n#else\n  // Do it right and find both F1 and F2\n  d.xy = (d.x < d.y) ? d.xy : d.yx; // Swap if smaller\n  d.xz = (d.x < d.z) ? d.xz : d.zx;\n  d.xw = (d.x < d.w) ? d.xw : d.wx;\n  d.y = min(d.y, d.z);\n  d.y = min(d.y, d.w);\n  return sqrt(d.xy);\n#endif\n}\n\n//#pragma glslify: cellular2x2x2 = require(\'./cellular2x2x2\')\n//#pragma glslify: cellular3D = require(\'./cellular3D\')\n//\n// Fractional Brownian motion\n// https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83\n//\nfloat rand(float n) {\n  return fract(sin(n) * 43758.5453123);\n}\n\nfloat noise(float p) {\n  float fl = floor(p);\n  float fc = fract(p);\n  return mix(rand(fl), rand(fl + 1.0), fc);\n}\n\nfloat rand(vec2 n) { \n  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);\n}\n\nfloat noise(vec2 p){\n  vec2 ip = floor(p);\n  vec2 u = fract(p);\n  u = u*u*(3.0-2.0*u);\n\n  float res = mix(mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x), mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);\n  return res*res;\n}\n\nfloat mod289_8(float x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289_8(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 perm(vec4 x) {\n  return mod289_8(((x * 34.0) + 1.0) * x);\n}\n\nfloat noise(vec3 p) {\n  vec3 a = floor(p);\n  vec3 d = p - a;\n  d = d * d * (3.0 - 2.0 * d);\n\n  vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);\n  vec4 k1 = perm(b.xyxy);\n  vec4 k2 = perm(k1.xyxy + b.zzww);\n\n  vec4 c = k2 + a.zzzz;\n  vec4 k3 = perm(c);\n  vec4 k4 = perm(c + 1.0);\n\n  vec4 o1 = fract(k3 * (1.0 / 41.0));\n  vec4 o2 = fract(k4 * (1.0 / 41.0));\n\n  vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);\n  vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);\n\n  return o4.y * d.y + o4.x * (1.0 - d.y);\n}\n\n#define NUM_OCTAVES 8\n\nfloat fbm(float x) {\n  float v = 0.0;\n  float a = 0.5;\n  float shift = float(100);\n  for (int i = 0; i < NUM_OCTAVES; ++i) {\n    v += a * noise(x);\n    x = x * 2.0 + shift;\n    a *= 0.5;\n  }\n  return v;\n}\n\nfloat fbm(vec2 x) {\n  float v = 0.0;\n  float a = 0.5;\n  vec2 shift = vec2(100);\n  // Rotate to reduce axial bias\n    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));\n  for (int i = 0; i < NUM_OCTAVES; ++i) {\n    v += a * noise(x);\n    x = rot * x * 2.0 + shift;\n    a *= 0.5;\n  }\n  return v;\n}\n\nfloat fbm(vec3 x) {\n  float v = 0.0;\n  float a = 0.5;\n  vec3 shift = vec3(100);\n  for (int i = 0; i < NUM_OCTAVES; ++i) {\n    v += a * noise(x);\n    x = x * 2.0 + shift;\n    a *= 0.5;\n  }\n  return v;\n}\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_10(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_10(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_9(vec3 x) {\n  return mod289_10(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_2(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_10(i); // Avoid truncation effects in permutation\n  vec3 p = permute_9( permute_9( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_4(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_4(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_4(vec4 x) {\n     return mod289_4(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_4(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_0(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_0 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_0;\n  vec3 i1 = min( g_0.xyz, l.zxy );\n  vec3 i2 = max( g_0.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_4(i);\n  vec4 p = permute_4( permute_4( permute_4(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D.wyz - D.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_0 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1.xy,h.z);\n  vec3 p3 = vec3(a1.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_4(vec4(dot(p0_0,p0_0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_0 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_0,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_9(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nfloat mod289_9(float x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0; }\n\nvec4 permute_8(vec4 x) {\n     return mod289_9(((x*34.0)+1.0)*x);\n}\n\nfloat permute_8(float x) {\n     return mod289_9(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_7(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat taylorInvSqrt_7(float r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 grad4(float j, vec4 ip)\n  {\n  const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n  vec4 p,s;\n\n  p.xyz = floor( fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n  p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n  s = vec4(lessThan(p, vec4(0.0)));\n  p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n\n  return p;\n  }\n\n// (sqrt(5) - 1)/4 = F4, used once below\n#define F4 0.309016994374947451\n\nfloat snoise_1(vec4 v)\n  {\n  const vec4  C = vec4( 0.138196601125011,  // (5 - sqrt(5))/20  G4\n                        0.276393202250021,  // 2 * G4\n                        0.414589803375032,  // 3 * G4\n                       -0.447213595499958); // -1 + 4 * G4\n\n// First corner\n  vec4 i  = floor(v + dot(v, vec4(F4)) );\n  vec4 x0 = v -   i + dot(i, C.xxxx);\n\n// Other corners\n\n// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)\n  vec4 i0;\n  vec3 isX = step( x0.yzw, x0.xxx );\n  vec3 isYZ = step( x0.zww, x0.yyz );\n//  i0.x = dot( isX, vec3( 1.0 ) );\n  i0.x = isX.x + isX.y + isX.z;\n  i0.yzw = 1.0 - isX;\n//  i0.y += dot( isYZ.xy, vec2( 1.0 ) );\n  i0.y += isYZ.x + isYZ.y;\n  i0.zw += 1.0 - isYZ.xy;\n  i0.z += isYZ.z;\n  i0.w += 1.0 - isYZ.z;\n\n  // i0 now contains the unique values 0,1,2,3 in each channel\n  vec4 i3 = clamp( i0, 0.0, 1.0 );\n  vec4 i2 = clamp( i0-1.0, 0.0, 1.0 );\n  vec4 i1 = clamp( i0-2.0, 0.0, 1.0 );\n\n  //  x0 = x0 - 0.0 + 0.0 * C.xxxx\n  //  x1 = x0 - i1  + 1.0 * C.xxxx\n  //  x2 = x0 - i2  + 2.0 * C.xxxx\n  //  x3 = x0 - i3  + 3.0 * C.xxxx\n  //  x4 = x0 - 1.0 + 4.0 * C.xxxx\n  vec4 x1 = x0 - i1 + C.xxxx;\n  vec4 x2 = x0 - i2 + C.yyyy;\n  vec4 x3 = x0 - i3 + C.zzzz;\n  vec4 x4 = x0 + C.wwww;\n\n// Permutations\n  i = mod289_9(i);\n  float j0 = permute_8( permute_8( permute_8( permute_8(i.w) + i.z) + i.y) + i.x);\n  vec4 j1 = permute_8( permute_8( permute_8( permute_8 (\n             i.w + vec4(i1.w, i2.w, i3.w, 1.0 ))\n           + i.z + vec4(i1.z, i2.z, i3.z, 1.0 ))\n           + i.y + vec4(i1.y, i2.y, i3.y, 1.0 ))\n           + i.x + vec4(i1.x, i2.x, i3.x, 1.0 ));\n\n// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope\n// 7*7*6 = 294, which is close to the ring size 17*17 = 289.\n  vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n\n  vec4 p0_1 = grad4(j0,   ip);\n  vec4 p1 = grad4(j1.x, ip);\n  vec4 p2 = grad4(j1.y, ip);\n  vec4 p3 = grad4(j1.z, ip);\n  vec4 p4 = grad4(j1.w, ip);\n\n// Normalise gradients\n  vec4 norm = taylorInvSqrt_7(vec4(dot(p0_1,p0_1), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n  p4 *= taylorInvSqrt_7(dot(p4,p4));\n\n// Mix contributions from the five corners\n  vec3 m0 = max(0.6 - vec3(dot(x0,x0), dot(x1,x1), dot(x2,x2)), 0.0);\n  vec2 m1 = max(0.6 - vec2(dot(x3,x3), dot(x4,x4)            ), 0.0);\n  m0 = m0 * m0;\n  m1 = m1 * m1;\n  return 49.0 * ( dot(m0*m0, vec3( dot( p0_1, x0 ), dot( p1, x1 ), dot( p2, x2 )))\n               + dot(m1*m1, vec2( dot( p3, x3 ), dot( p4, x4 ) ) ) ) ;\n\n  }\n\n//\n// GLSL textureless classic 2D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_1(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1(vec4 x)\n{\n  return mod289_1(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade_1(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise_0(vec2 P)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod289_1(Pi); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute_1(permute_1(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy_0 = abs(gx) - 0.5 ;\n  vec4 tx_0 = floor(gx + 0.5);\n  gx = gx - tx_0;\n\n  vec2 g00 = vec2(gx.x,gy_0.x);\n  vec2 g10 = vec2(gx.y,gy_0.y);\n  vec2 g01 = vec2(gx.z,gy_0.z);\n  vec2 g11 = vec2(gx.w,gy_0.w);\n\n  vec4 norm = taylorInvSqrt_1(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade_1(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\n//\n// GLSL textureless classic 3D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_3(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_3(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_3(vec4 x)\n{\n  return mod289_3(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_3(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade_3(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise_1(vec3 P)\n{\n  vec3 Pi0 = floor(P); // Integer part for indexing\n  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1\n  Pi0 = mod289_3(Pi0);\n  Pi1 = mod289_3(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute_3(permute_3(ix) + iy);\n  vec4 ixy0 = permute_3(ixy + iz0);\n  vec4 ixy1 = permute_3(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt_3(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt_3(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade_3(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\n//\n// GLSL textureless classic 4D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_5(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_5(vec4 x)\n{\n  return mod289_5(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_5(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 fade_4(vec4 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise_2(vec4 P)\n{\n  vec4 Pi0 = floor(P); // Integer part for indexing\n  vec4 Pi1 = Pi0 + 1.0; // Integer part + 1\n  Pi0 = mod289_5(Pi0);\n  Pi1 = mod289_5(Pi1);\n  vec4 Pf0 = fract(P); // Fractional part for interpolation\n  vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = vec4(Pi0.zzzz);\n  vec4 iz1 = vec4(Pi1.zzzz);\n  vec4 iw0 = vec4(Pi0.wwww);\n  vec4 iw1 = vec4(Pi1.wwww);\n\n  vec4 ixy = permute_5(permute_5(ix) + iy);\n  vec4 ixy0 = permute_5(ixy + iz0);\n  vec4 ixy1 = permute_5(ixy + iz1);\n  vec4 ixy00 = permute_5(ixy0 + iw0);\n  vec4 ixy01 = permute_5(ixy0 + iw1);\n  vec4 ixy10 = permute_5(ixy1 + iw0);\n  vec4 ixy11 = permute_5(ixy1 + iw1);\n\n  vec4 gx00 = ixy00 * (1.0 / 7.0);\n  vec4 gy00 = floor(gx00) * (1.0 / 7.0);\n  vec4 gz00 = floor(gy00) * (1.0 / 6.0);\n  gx00 = fract(gx00) - 0.5;\n  gy00 = fract(gy00) - 0.5;\n  gz00 = fract(gz00) - 0.5;\n  vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);\n  vec4 sw00 = step(gw00, vec4(0.0));\n  gx00 -= sw00 * (step(0.0, gx00) - 0.5);\n  gy00 -= sw00 * (step(0.0, gy00) - 0.5);\n\n  vec4 gx01 = ixy01 * (1.0 / 7.0);\n  vec4 gy01 = floor(gx01) * (1.0 / 7.0);\n  vec4 gz01 = floor(gy01) * (1.0 / 6.0);\n  gx01 = fract(gx01) - 0.5;\n  gy01 = fract(gy01) - 0.5;\n  gz01 = fract(gz01) - 0.5;\n  vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);\n  vec4 sw01 = step(gw01, vec4(0.0));\n  gx01 -= sw01 * (step(0.0, gx01) - 0.5);\n  gy01 -= sw01 * (step(0.0, gy01) - 0.5);\n\n  vec4 gx10 = ixy10 * (1.0 / 7.0);\n  vec4 gy10 = floor(gx10) * (1.0 / 7.0);\n  vec4 gz10 = floor(gy10) * (1.0 / 6.0);\n  gx10 = fract(gx10) - 0.5;\n  gy10 = fract(gy10) - 0.5;\n  gz10 = fract(gz10) - 0.5;\n  vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);\n  vec4 sw10 = step(gw10, vec4(0.0));\n  gx10 -= sw10 * (step(0.0, gx10) - 0.5);\n  gy10 -= sw10 * (step(0.0, gy10) - 0.5);\n\n  vec4 gx11 = ixy11 * (1.0 / 7.0);\n  vec4 gy11 = floor(gx11) * (1.0 / 7.0);\n  vec4 gz11 = floor(gy11) * (1.0 / 6.0);\n  gx11 = fract(gx11) - 0.5;\n  gy11 = fract(gy11) - 0.5;\n  gz11 = fract(gz11) - 0.5;\n  vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);\n  vec4 sw11 = step(gw11, vec4(0.0));\n  gx11 -= sw11 * (step(0.0, gx11) - 0.5);\n  gy11 -= sw11 * (step(0.0, gy11) - 0.5);\n\n  vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);\n  vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);\n  vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);\n  vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);\n  vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);\n  vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);\n  vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);\n  vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);\n  vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);\n  vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);\n  vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);\n  vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);\n  vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);\n  vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);\n  vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);\n  vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);\n\n  vec4 norm00 = taylorInvSqrt_5(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));\n  g0000 *= norm00.x;\n  g0100 *= norm00.y;\n  g1000 *= norm00.z;\n  g1100 *= norm00.w;\n\n  vec4 norm01 = taylorInvSqrt_5(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));\n  g0001 *= norm01.x;\n  g0101 *= norm01.y;\n  g1001 *= norm01.z;\n  g1101 *= norm01.w;\n\n  vec4 norm10 = taylorInvSqrt_5(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));\n  g0010 *= norm10.x;\n  g0110 *= norm10.y;\n  g1010 *= norm10.z;\n  g1110 *= norm10.w;\n\n  vec4 norm11 = taylorInvSqrt_5(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));\n  g0011 *= norm11.x;\n  g0111 *= norm11.y;\n  g1011 *= norm11.z;\n  g1111 *= norm11.w;\n\n  float n0000 = dot(g0000, Pf0);\n  float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));\n  float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));\n  float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));\n  float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));\n  float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));\n  float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));\n  float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));\n  float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));\n  float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));\n  float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));\n  float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));\n  float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));\n  float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));\n  float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));\n  float n1111 = dot(g1111, Pf1);\n\n  vec4 fade_xyzw = fade_4(Pf0);\n  vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);\n  vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);\n  vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);\n  vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);\n  float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);\n  return 2.2 * n_xyzw;\n}\n\n//\n// GLSL textureless classic 2D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_2(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_2(vec4 x)\n{\n  return mod289_2(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_2(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade_2(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic variant\nfloat pnoise_1(vec2 P, vec2 rep)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod(Pi, rep.xyxy); // To create noise with explicit period\n  Pi = mod289_2(Pi);        // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute_2(permute_2(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy_1 = abs(gx) - 0.5 ;\n  vec4 tx_1 = floor(gx + 0.5);\n  gx = gx - tx_1;\n\n  vec2 g00 = vec2(gx.x,gy_1.x);\n  vec2 g10 = vec2(gx.y,gy_1.y);\n  vec2 g01 = vec2(gx.z,gy_1.z);\n  vec2 g11 = vec2(gx.w,gy_1.w);\n\n  vec4 norm = taylorInvSqrt_2(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade_2(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\n//\n// GLSL textureless classic 3D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-10-11\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_6(vec3 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_6(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_6(vec4 x)\n{\n  return mod289_6(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_6(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec3 fade_5(vec3 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic variant\nfloat pnoise_2(vec3 P, vec3 rep)\n{\n  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n  Pi0 = mod289_6(Pi0);\n  Pi1 = mod289_6(Pi1);\n  vec3 Pf0 = fract(P); // Fractional part for interpolation\n  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = Pi0.zzzz;\n  vec4 iz1 = Pi1.zzzz;\n\n  vec4 ixy = permute_6(permute_6(ix) + iy);\n  vec4 ixy0 = permute_6(ixy + iz0);\n  vec4 ixy1 = permute_6(ixy + iz1);\n\n  vec4 gx0 = ixy0 * (1.0 / 7.0);\n  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n  gx0 = fract(gx0);\n  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n  vec4 sz0 = step(gz0, vec4(0.0));\n  gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n  gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n\n  vec4 gx1 = ixy1 * (1.0 / 7.0);\n  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n  gx1 = fract(gx1);\n  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n  vec4 sz1 = step(gz1, vec4(0.0));\n  gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n  gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n\n  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);\n  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);\n  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);\n  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);\n  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);\n  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);\n  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);\n  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);\n\n  vec4 norm0 = taylorInvSqrt_6(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n  g000 *= norm0.x;\n  g010 *= norm0.y;\n  g100 *= norm0.z;\n  g110 *= norm0.w;\n  vec4 norm1 = taylorInvSqrt_6(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n  g001 *= norm1.x;\n  g011 *= norm1.y;\n  g101 *= norm1.z;\n  g111 *= norm1.w;\n\n  float n000 = dot(g000, Pf0);\n  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n  float n111 = dot(g111, Pf1);\n\n  vec3 fade_xyz = fade_5(Pf0);\n  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n  return 2.2 * n_xyz;\n}\n\n//\n// GLSL textureless classic 4D noise "cnoise",\n// with an RSL-style periodic variant "pnoise".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_0(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_0(vec4 x)\n{\n  return mod289_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_0(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec4 fade_0(vec4 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise, periodic version\nfloat pnoise_0(vec4 P, vec4 rep)\n{\n  vec4 Pi0 = mod(floor(P), rep); // Integer part modulo rep\n  vec4 Pi1 = mod(Pi0 + 1.0, rep); // Integer part + 1 mod rep\n  Pi0 = mod289_0(Pi0);\n  Pi1 = mod289_0(Pi1);\n  vec4 Pf0 = fract(P); // Fractional part for interpolation\n  vec4 Pf1 = Pf0 - 1.0; // Fractional part - 1.0\n  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n  vec4 iy = vec4(Pi0.yy, Pi1.yy);\n  vec4 iz0 = vec4(Pi0.zzzz);\n  vec4 iz1 = vec4(Pi1.zzzz);\n  vec4 iw0 = vec4(Pi0.wwww);\n  vec4 iw1 = vec4(Pi1.wwww);\n\n  vec4 ixy = permute_0(permute_0(ix) + iy);\n  vec4 ixy0 = permute_0(ixy + iz0);\n  vec4 ixy1 = permute_0(ixy + iz1);\n  vec4 ixy00 = permute_0(ixy0 + iw0);\n  vec4 ixy01 = permute_0(ixy0 + iw1);\n  vec4 ixy10 = permute_0(ixy1 + iw0);\n  vec4 ixy11 = permute_0(ixy1 + iw1);\n\n  vec4 gx00 = ixy00 * (1.0 / 7.0);\n  vec4 gy00 = floor(gx00) * (1.0 / 7.0);\n  vec4 gz00 = floor(gy00) * (1.0 / 6.0);\n  gx00 = fract(gx00) - 0.5;\n  gy00 = fract(gy00) - 0.5;\n  gz00 = fract(gz00) - 0.5;\n  vec4 gw00 = vec4(0.75) - abs(gx00) - abs(gy00) - abs(gz00);\n  vec4 sw00 = step(gw00, vec4(0.0));\n  gx00 -= sw00 * (step(0.0, gx00) - 0.5);\n  gy00 -= sw00 * (step(0.0, gy00) - 0.5);\n\n  vec4 gx01 = ixy01 * (1.0 / 7.0);\n  vec4 gy01 = floor(gx01) * (1.0 / 7.0);\n  vec4 gz01 = floor(gy01) * (1.0 / 6.0);\n  gx01 = fract(gx01) - 0.5;\n  gy01 = fract(gy01) - 0.5;\n  gz01 = fract(gz01) - 0.5;\n  vec4 gw01 = vec4(0.75) - abs(gx01) - abs(gy01) - abs(gz01);\n  vec4 sw01 = step(gw01, vec4(0.0));\n  gx01 -= sw01 * (step(0.0, gx01) - 0.5);\n  gy01 -= sw01 * (step(0.0, gy01) - 0.5);\n\n  vec4 gx10 = ixy10 * (1.0 / 7.0);\n  vec4 gy10 = floor(gx10) * (1.0 / 7.0);\n  vec4 gz10 = floor(gy10) * (1.0 / 6.0);\n  gx10 = fract(gx10) - 0.5;\n  gy10 = fract(gy10) - 0.5;\n  gz10 = fract(gz10) - 0.5;\n  vec4 gw10 = vec4(0.75) - abs(gx10) - abs(gy10) - abs(gz10);\n  vec4 sw10 = step(gw10, vec4(0.0));\n  gx10 -= sw10 * (step(0.0, gx10) - 0.5);\n  gy10 -= sw10 * (step(0.0, gy10) - 0.5);\n\n  vec4 gx11 = ixy11 * (1.0 / 7.0);\n  vec4 gy11 = floor(gx11) * (1.0 / 7.0);\n  vec4 gz11 = floor(gy11) * (1.0 / 6.0);\n  gx11 = fract(gx11) - 0.5;\n  gy11 = fract(gy11) - 0.5;\n  gz11 = fract(gz11) - 0.5;\n  vec4 gw11 = vec4(0.75) - abs(gx11) - abs(gy11) - abs(gz11);\n  vec4 sw11 = step(gw11, vec4(0.0));\n  gx11 -= sw11 * (step(0.0, gx11) - 0.5);\n  gy11 -= sw11 * (step(0.0, gy11) - 0.5);\n\n  vec4 g0000 = vec4(gx00.x,gy00.x,gz00.x,gw00.x);\n  vec4 g1000 = vec4(gx00.y,gy00.y,gz00.y,gw00.y);\n  vec4 g0100 = vec4(gx00.z,gy00.z,gz00.z,gw00.z);\n  vec4 g1100 = vec4(gx00.w,gy00.w,gz00.w,gw00.w);\n  vec4 g0010 = vec4(gx10.x,gy10.x,gz10.x,gw10.x);\n  vec4 g1010 = vec4(gx10.y,gy10.y,gz10.y,gw10.y);\n  vec4 g0110 = vec4(gx10.z,gy10.z,gz10.z,gw10.z);\n  vec4 g1110 = vec4(gx10.w,gy10.w,gz10.w,gw10.w);\n  vec4 g0001 = vec4(gx01.x,gy01.x,gz01.x,gw01.x);\n  vec4 g1001 = vec4(gx01.y,gy01.y,gz01.y,gw01.y);\n  vec4 g0101 = vec4(gx01.z,gy01.z,gz01.z,gw01.z);\n  vec4 g1101 = vec4(gx01.w,gy01.w,gz01.w,gw01.w);\n  vec4 g0011 = vec4(gx11.x,gy11.x,gz11.x,gw11.x);\n  vec4 g1011 = vec4(gx11.y,gy11.y,gz11.y,gw11.y);\n  vec4 g0111 = vec4(gx11.z,gy11.z,gz11.z,gw11.z);\n  vec4 g1111 = vec4(gx11.w,gy11.w,gz11.w,gw11.w);\n\n  vec4 norm00 = taylorInvSqrt_0(vec4(dot(g0000, g0000), dot(g0100, g0100), dot(g1000, g1000), dot(g1100, g1100)));\n  g0000 *= norm00.x;\n  g0100 *= norm00.y;\n  g1000 *= norm00.z;\n  g1100 *= norm00.w;\n\n  vec4 norm01 = taylorInvSqrt_0(vec4(dot(g0001, g0001), dot(g0101, g0101), dot(g1001, g1001), dot(g1101, g1101)));\n  g0001 *= norm01.x;\n  g0101 *= norm01.y;\n  g1001 *= norm01.z;\n  g1101 *= norm01.w;\n\n  vec4 norm10 = taylorInvSqrt_0(vec4(dot(g0010, g0010), dot(g0110, g0110), dot(g1010, g1010), dot(g1110, g1110)));\n  g0010 *= norm10.x;\n  g0110 *= norm10.y;\n  g1010 *= norm10.z;\n  g1110 *= norm10.w;\n\n  vec4 norm11 = taylorInvSqrt_0(vec4(dot(g0011, g0011), dot(g0111, g0111), dot(g1011, g1011), dot(g1111, g1111)));\n  g0011 *= norm11.x;\n  g0111 *= norm11.y;\n  g1011 *= norm11.z;\n  g1111 *= norm11.w;\n\n  float n0000 = dot(g0000, Pf0);\n  float n1000 = dot(g1000, vec4(Pf1.x, Pf0.yzw));\n  float n0100 = dot(g0100, vec4(Pf0.x, Pf1.y, Pf0.zw));\n  float n1100 = dot(g1100, vec4(Pf1.xy, Pf0.zw));\n  float n0010 = dot(g0010, vec4(Pf0.xy, Pf1.z, Pf0.w));\n  float n1010 = dot(g1010, vec4(Pf1.x, Pf0.y, Pf1.z, Pf0.w));\n  float n0110 = dot(g0110, vec4(Pf0.x, Pf1.yz, Pf0.w));\n  float n1110 = dot(g1110, vec4(Pf1.xyz, Pf0.w));\n  float n0001 = dot(g0001, vec4(Pf0.xyz, Pf1.w));\n  float n1001 = dot(g1001, vec4(Pf1.x, Pf0.yz, Pf1.w));\n  float n0101 = dot(g0101, vec4(Pf0.x, Pf1.y, Pf0.z, Pf1.w));\n  float n1101 = dot(g1101, vec4(Pf1.xy, Pf0.z, Pf1.w));\n  float n0011 = dot(g0011, vec4(Pf0.xy, Pf1.zw));\n  float n1011 = dot(g1011, vec4(Pf1.x, Pf0.y, Pf1.zw));\n  float n0111 = dot(g0111, vec4(Pf0.x, Pf1.yzw));\n  float n1111 = dot(g1111, Pf1);\n\n  vec4 fade_xyzw = fade_0(Pf0);\n  vec4 n_0w = mix(vec4(n0000, n1000, n0100, n1100), vec4(n0001, n1001, n0101, n1101), fade_xyzw.w);\n  vec4 n_1w = mix(vec4(n0010, n1010, n0110, n1110), vec4(n0011, n1011, n0111, n1111), fade_xyzw.w);\n  vec4 n_zw = mix(n_0w, n_1w, fade_xyzw.z);\n  vec2 n_yzw = mix(n_zw.xy, n_zw.zw, fade_xyzw.y);\n  float n_xyzw = mix(n_yzw.x, n_yzw.y, fade_xyzw.x);\n  return 2.2 * n_xyzw;\n}\n\nfloat map(float value, float inMin, float inMax, float outMin, float outMax) {\n  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);\n}\n\nvec2 map(vec2 value, vec2 inMin, vec2 inMax, vec2 outMin, vec2 outMax) {\n  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);\n}\n\nvec3 map(vec3 value, vec3 inMin, vec3 inMax, vec3 outMin, vec3 outMax) {\n  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);\n}\n\nvec4 map(vec4 value, vec4 inMin, vec4 inMax, vec4 outMin, vec4 outMax) {\n  return outMin + (outMax - outMin) * (value - inMin) / (inMax - inMin);\n}\n\nhighp float random(vec2 co)\n{\n    highp float a = 12.9898;\n    highp float b = 78.233;\n    highp float c = 43758.5453;\n    highp float dt= dot(co.xy ,vec2(a,b));\n    highp float sn= mod(dt,3.14);\n    return fract(sin(sn) * c);\n}\n\n// return 1 if v inside the box, return 0 otherwise\nfloat insideBox(vec2 v, vec2 bottomLeft, vec2 topRight) {\n  vec2 s = step(bottomLeft, v) - step(topRight, v);\n  return s.x * s.y;   \n}\n\nfloat insideBox3D(vec3 v, vec3 bottomLeft, vec3 topRight) {\n  vec3 s = step(bottomLeft, v) - step(topRight, v);\n  return s.x * s.y * s.z; \n}\n\nvoid main() {\n  vec3 rgb = texture2D(buffer, vUv).rgb;\n\n  // rect0 (simplex & classic noise)\n  if (insideBox(vUv, vec2(rect0.x / dims.x, rect0.y / dims.y), vec2((rect0.x + rect0.z) / dims.x, (rect0.y + rect0.w) / dims.y)) >= 1.0) {\n    vec2 offset = vec2(snoise_0(vec3(vUv * 22.0, time)), cnoise_1(vec3(vUv * 7.0, time * 0.5))) / dims;\n    rgb = texture2D(buffer, vUv + offset).rgb;\n  }\n\n  // rect1 (perlin noise)\n  if (insideBox(vUv, vec2(rect1.x / dims.x, rect1.y / dims.y), vec2((rect1.x + rect1.z) / dims.x, (rect1.y + rect1.w) / dims.y)) >= 1.0) {\n    float x = pnoise_2(vec3(vUv * 90.0, time * 1.2), vec3(0.34, 5.731, 0.12)) / dims.x;\n    float y = pnoise_2(vec3(vUv.y * 53.84, time * 1.41, vUv.x * 20.14), vec3(0.89, 0.23, 0.911)) / dims.y;\n    vec2 offset = vec2(x, y);\n    rgb = texture2D(buffer, vUv + offset).rgb;\n  }\n\n  // rect2 (fbm noise)\n  if (insideBox(vUv, vec2(rect2.x / dims.x, rect2.y / dims.y), vec2((rect2.x + rect2.z) / dims.x, (rect2.y + rect2.w) / dims.y)) >= 1.0) {\n    float x = (fbm(vec3(vUv.x * 2.0, vUv.y, time * 5.0)) - 0.5) * 4.0 / dims.x * 1.0; // 2.0\n    float y = (fbm(vec3(time * 3.0, vUv.x, vUv.y * 4.0)) - 0.5) * 8.0 / dims.y * 1.5; // 3.0\n    vec2 offset = vec2(x, y);\n    rgb = texture2D(buffer, vUv + offset).rgb;\n  }\n\n  // rect3 (fbm & simplex noise)\n  if (insideBox(vUv, vec2(rect3.x / dims.x, rect3.y / dims.y), vec2((rect3.x + rect3.z) / dims.x, (rect3.y + rect3.w) / dims.y)) >= 1.0) {\n    float x = (fbm(vec2((vUv.x - 0.5) * 2.0, time * 5.0)) - 0.35) * 4.0 / dims.x + snoise_0(vec3(vUv.x * 4.3, vUv.y, time * 0.4)) * 0.005; // 0.01\n    float y = (fbm(vec2(time * 3.0, vUv.y * 4.0)) - 0.35) * 4.0 / dims.y + snoise_0(vec3(vUv.x * 3.3, vUv.y * 3.4, time * 0.38)) * 0.005; // 0.01\n    vec2 offset = vec2(x, y);\n    rgb = texture2D(buffer, vUv + offset).rgb;\n  }\n\n  // rect4 (x+)\n  if (insideBox(vUv, vec2(rect4.x / dims.x, rect4.y / dims.y), vec2((rect4.x + rect4.z) / dims.x, (rect4.y + rect4.w) / dims.y)) >= 1.0) {\n    float offset = 1.0 / dims.x;\n    rgb = texture2D(buffer, vec2(vUv.x + offset, vUv.y)).rgb;\n  }\n\n  // rect5 (x-)\n  if (insideBox(vUv, vec2(rect5.x / dims.x, rect5.y / dims.y), vec2((rect5.x + rect5.z) / dims.x, (rect5.y + rect5.w) / dims.y)) >= 1.0) {\n    float offset = 1.0 / dims.x;\n    rgb = texture2D(buffer, vec2(vUv.x - offset, vUv.y)).rgb;\n  }\n\n  // rect6 (y+)\n  if (insideBox(vUv, vec2(rect6.x / dims.x, rect6.y / dims.y), vec2((rect6.x + rect6.z) / dims.x, (rect6.y + rect6.w) / dims.y)) >= 1.0) {\n    float offset = 1.0 / dims.y;\n    rgb = texture2D(buffer, vec2(vUv.x, vUv.y + offset)).rgb;\n  }\n\n  // rect7 (y-)\n  if (insideBox(vUv, vec2(rect7.x / dims.x, rect7.y / dims.y), vec2((rect7.x + rect7.z) / dims.x, (rect7.y + rect7.w) / dims.y)) >= 1.0) {\n    float offset = 1.0 / dims.y;\n    rgb = texture2D(buffer, vec2(vUv.x, vUv.y - offset)).rgb;\n  }\n\n  // rect8 (animate)\n  if (insideBox(vUv, vec2(rect8.x / dims.x, rect8.y / dims.y), vec2((rect8.x + rect8.z) / dims.x, (rect8.y + rect8.w) / dims.y)) >= 1.0) {\n    float x = floor(vUv.x * dims.x) - rect8.x;\n    float y = floor(vUv.y * dims.y) - rect8.y;\n    float step = mod(floor(time * 24.0), 16.0);\n\n    if (step == 0.0 && mod(y, 2.0) == 0.0) {\n      vec2 pos = vec2(vUv.x + 1.0 / dims.x, vUv.y);\n      rgb = texture2D(buffer, pos).rgb;\n    }\n\n    if (step == 0.0 && mod(y, 2.0) == 1.0) {\n      vec2 pos = vec2(vUv.x - 1.0 / dims.x, vUv.y);\n      rgb = texture2D(buffer, pos).rgb;\n    }\n\n    if (step == 8.0 && mod(y, 2.0) == 0.0) {\n      vec2 pos = vec2(vUv.x - 1.0 / dims.x, vUv.y);\n      rgb = texture2D(buffer, pos).rgb;\n    }\n\n    if (step == 8.0 && mod(y, 2.0) == 1.0) {\n      vec2 pos = vec2(vUv.x + 1.0 / dims.x, vUv.y);\n      rgb = texture2D(buffer, pos).rgb;\n    }\n  }\n\n  // rect9 (animate)\n  if (insideBox(vUv, vec2(rect9.x / dims.x, rect9.y / dims.y), vec2((rect9.x + rect9.z) / dims.x, (rect9.y + rect9.w) / dims.y)) >= 1.0) {\n    float x = floor(vUv.x * dims.x) - rect9.x;\n    float y = floor(vUv.y * dims.y) - rect9.y;\n    float step = mod(floor(time * 60.0), 4.0);\n\n    if (step == 0.0 && mod(x, 2.0) == 0.0 && mod(y, 2.0) == 0.0) {\n      vec2 pos = vec2(vUv.x + 1.0 / dims.x, vUv.y);\n      rgb = texture2D(buffer, pos).rgb;\n    }\n\n    if (step == 0.0 && mod(x, 2.0) == 1.0 && mod(y, 2.0) == 0.0) {\n      vec2 pos = vec2(vUv.x, vUv.y - 1.0 / dims.y);\n      rgb = texture2D(buffer, pos).rgb;\n    }\n\n    if (step == 0.0 && mod(x, 2.0) == 1.0 && mod(y, 2.0) == 1.0) {\n      vec2 pos = vec2(vUv.x - 1.0 / dims.x, vUv.y);\n      rgb = texture2D(buffer, pos).rgb;\n    }\n\n    if (step == 0.0 && mod(x, 2.0) == 0.0 && mod(y, 2.0) == 1.0) {\n      vec2 pos = vec2(vUv.x, vUv.y + 1.0 / dims.y);\n      rgb = texture2D(buffer, pos).rgb;\n    }\n  }\n\n  // rect10 (animate)\n  if (insideBox(vUv, vec2(rect10.x / dims.x, rect10.y / dims.y), vec2((rect10.x + rect10.z) / dims.x, (rect10.y + rect10.w) / dims.y)) >= 1.0) {\n    float x = floor(vUv.x * dims.x) - rect10.x;\n    float y = floor(vUv.y * dims.y) - rect10.y;\n    float step = mod(floor(time * 60.0), 4.0);\n\n    if (step == 0.0 && mod(x + y, 2.0) == 0.0) {\n      vec2 pos = vec2(vUv.x + 1.0 / dims.x, vUv.y - 1.0 / dims.y);\n      rgb = texture2D(buffer, pos).rgb;\n    }\n\n    if (step == 0.0 && mod(x + y, 2.0) == 1.0) {\n      vec2 pos = vec2(vUv.x - 1.0 / dims.x, vUv.y + 1.0 / dims.y);\n      rgb = texture2D(buffer, pos).rgb;\n    }\n  }\n\n  // rect11 (animate)\n  if (insideBox(vUv, vec2(rect11.x / dims.x, rect11.y / dims.y), vec2((rect11.x + rect11.z) / dims.x, (rect11.y + rect11.w) / dims.y)) >= 1.0) {\n    float x = floor(vUv.x * dims.x) - rect11.x;\n    float y = floor(vUv.y * dims.y) - rect11.y;\n\n    vec2 pos = vec2(vUv.x, vUv.y + sin(x * 0.1 + time * 2.0) / dims.y * 1.0);\n    rgb = texture2D(buffer, pos).rgb;\n  }\n\n  // rect12 (reset)\n  if (insideBox(vUv, vec2(rect12.x / dims.x, rect12.y / dims.y), vec2((rect12.x + rect12.z) / dims.x, (rect12.y + rect12.w) / dims.y)) >= 1.0) {\n    if (random(vec2(vUv.x + time, vUv.y)) < 0.06) {\n      rgb = texture2D(tex, vUv).rgb;\n    }\n  }\n\n  // rect13 (reset)\n  if (insideBox(vUv, vec2(rect13.x / dims.x, rect13.y / dims.y), vec2((rect13.x + rect13.z) / dims.x, (rect13.y + rect13.w) / dims.y)) >= 1.0) {\n    float x = floor(vUv.x * dims.x) - rect13.x;\n    float y = floor(vUv.y * dims.y) - rect13.y;\n\n    if (mod(x + y, 4.0) == mod(floor(time * 10.0), 4.0) && mod(y, 2.0) == 0.0) {\n      rgb = texture2D(tex, vUv).rgb;\n    }\n\n    if (mod(x + y + 1.0, 4.0) == mod(floor(time * 6.0), 4.0) && mod(y, 2.0) == 1.0) {\n      rgb = texture2D(tex, vUv).rgb;\n    }\n  }\n\n  // rect14 (reset)\n  if (insideBox(vUv, vec2(rect14.x / dims.x, rect14.y / dims.y), vec2((rect14.x + rect14.z) / dims.x, (rect14.y + rect14.w) / dims.y)) >= 1.0) {\n    float x = floor(vUv.x * dims.x) - rect14.x;\n    float y = floor(vUv.y * dims.y) - rect14.y;\n    float step = mod(floor(time * 50.0), 16.0);\n\n    if (mod(x, 16.0) == step) {\n      rgb = texture2D(tex, vUv).rgb;\n    }\n  }\n\n  // rect15 (reset)\n  if (insideBox(vUv, vec2(rect15.x / dims.x, rect15.y / dims.y), vec2((rect15.x + rect15.z) / dims.x, (rect15.y + rect15.w) / dims.y)) >= 1.0) {\n    float x = floor(vUv.x * dims.x) - rect15.x;\n    float y = floor(vUv.y * dims.y) - rect15.y;\n    float step = mod(floor(time * 50.0), 16.0);\n\n    if (mod(y, 16.0) == step) {\n      rgb = texture2D(tex, vUv).rgb;\n    }\n  }\n\n  vec4 color = vec4(rgb, 1.0);\n\n  gl_FragColor = color;\n}']),
            S = i(["precision mediump float;\n#define GLSLIFY 1\n\nuniform sampler2D buffer;\n\nvarying vec2 vUv;\n\nvoid main() {\n  gl_FragColor = texture2D(buffer, vUv);\n}"]);
        t.exports = function(a, e) {
            var s, f, r = Math.min(window.devicePixelRatio, 2),
                t = a.canvas,
                c = _(t, {
                    parent: e,
                    scale: r
                }).on("tick", function(e) {
                    ! function(e) {
                        var t = s[u];
                        s[u ^= 1].bind(), n.bind(), n.uniforms.buffer = t.color[0].bind(0), n.uniforms.tex = f.bind(1), n.uniforms.dims = c.shape, n.uniforms.time = e, n.uniforms.rect0 = l[h[0]] || [0, 0, 0, 0], n.uniforms.rect1 = l[h[1]] || [0, 0, 0, 0], n.uniforms.rect2 = l[h[2]] || [0, 0, 0, 0], n.uniforms.rect3 = l[h[3]] || [0, 0, 0, 0], n.uniforms.rect4 = l[h[4]] || [0, 0, 0, 0], n.uniforms.rect5 = l[h[5]] || [0, 0, 0, 0], n.uniforms.rect6 = l[h[6]] || [0, 0, 0, 0], n.uniforms.rect7 = l[h[7]] || [0, 0, 0, 0], n.uniforms.rect8 = l[h[8]] || [0, 0, 0, 0], n.uniforms.rect9 = l[h[9]] || [0, 0, 0, 0], n.uniforms.rect10 = l[h[10]] || [0, 0, 0, 0], n.uniforms.rect11 = l[h[11]] || [0, 0, 0, 0], n.uniforms.rect12 = l[h[12]] || [0, 0, 0, 0], n.uniforms.rect13 = l[h[13]] || [0, 0, 0, 0], n.uniforms.rect14 = l[h[14]] || [0, 0, 0, 0], n.uniforms.rect15 = l[h[15]] || [0, 0, 0, 0], T(a)
                    }(v += e / 1e3);
                    var t = y(c.shape, 2),
                        e = t[0],
                        t = t[1];
                    a.bindFramebuffer(a.FRAMEBUFFER, null), a.viewport(0, 0, e * r, t * r), i.bind(), i.uniforms.buffer = s[u].color[0].bind(), T(a)
                }).on("dispose", function() {
                    n.dispose(), s[0].dispose(), s[1].dispose(), f.dispose();
                    var e, t = d(g);
                    try {
                        for (t.s(); !(e = t.n()).done;) {
                            var r = e.value;
                            clearTimeout(r)
                        }
                    } catch (e) {
                        t.e(e)
                    } finally {
                        t.f()
                    }
                }).on("resize", function() {
                    var e, t = d(g);
                    try {
                        for (t.s(); !(e = t.n()).done;) {
                            var r = e.value;
                            clearTimeout(r)
                        }
                    } catch (e) {
                        t.e(e)
                    } finally {
                        t.f()
                    }
                    o()
                }),
                n = E(a, P, I),
                i = E(a, P, S),
                u = 0,
                l = [],
                h = [],
                g = [],
                p = [
                    [222, 164, 80], // 0 0 0 
                    [155, 70, 31], // 0 135 67
                    [106, 29, 47], // 0 226 56
                    [53, 76, 76], // 41 173 255
                    [66, 53, 76], // 83, 76, 69
                    [119, 39, 83], // 119 39 83
                    [171, 82, 54],
                    [194, 195, 199],
                    [255, 0, 77],
                    [255, 119, 168],
                    [255, 163, 0],
                    [255, 204, 170],
                    [255, 236, 39],
                    [255, 241, 232]
                ],
                o = function() {
                    var e = y(c.shape, 2),
                        n = e[0],
                        t = e[1];
                    (s = [m(a, [n, t]), m(a, [n, t])])[u = 0].color[0].magFilter = a.NEAREST, s[0].color[0].minFilter = a.NEAREST, s[1].color[0].magFilter = a.NEAREST, s[1].color[0].minFilter = a.NEAREST, f = b(a, [n, t]);
                    var e = R(c.shape, {
                            pixelSizeMin: 128,
                            pixelSizeMax: 128, // GVM
                            gapSizeMin: 0, // 2
                            gapSizeMax: 0, // 3
                            rectWidthMin: 128,
                            rectHeightMin: 128,
                            splitDepthVertical: .92,
                            splitDepthHorizontal: .92,
                            numColors: 5
                        }),
                        i = e.grid,
                        t = w(new Uint8Array(n * t * 4), [n, t, 4]);
                    A(t, function(e, t, r) {
                        return 3 === r ? 255 : p[i[e + t * n]][r]
                    }), s[0].color[0].setPixels(t), f.setPixels(t), l = e.rects, h = [], g = [];
                    for (var r = function e(t) {
                            var r = Math.floor(5e3 * Math.random());
                            return setTimeout(function() {
                                h[t] = Math.floor(Math.random() * l.length), e(t)
                            }, r) // o is number of activated spaces
                        }, o = 0; o < 16; o++) h.push(Math.floor(Math.random() * l.length)), g[o] = r(o)
                };
            o(), n.attributes.position.location = 0, i.attributes.position.location = 0, a.disable(a.DEPTH_TEST);
            var v = 0;
            return c.start(), x(c, {
                canvas: t,
                gl: a
            })
        }
    }, {
        "./app": 3,
        "./grid-generator": 4,
        "a-big-triangle": 5,
        "gl-fbo": 23,
        "gl-shader": 27,
        "gl-texture2d": 34,
        glslify: 47,
        ndarray: 54,
        "ndarray-fill": 52,
        "object-assign": 55
    }],
    3: [function(e, t, r) {
        "use strict";
        var a = e("canvas-fit"),
            s = e("raf-loop");
        t.exports = function(r, e) {
            if (!r) throw new TypeError("must specify a canvas element");
            var n = a(r, (e = e || {}).parent, e.scale),
                i = s(),
                o = [0, 0];
            return t(), window.addEventListener("resize", t, !1), Object.defineProperties(i, {
                scale: {
                    get: function() {
                        return n.scale
                    },
                    set: function(e) {
                        n.scale = e
                    }
                },
                shape: {
                    get: function() {
                        return o
                    }
                },
                parent: {
                    get: function() {
                        return n.parent
                    },
                    set: function(e) {
                        n.parent = e
                    }
                }
            }), i.dispose = function() {
                i.stop(), window.removeEventListener("resize", t, !1), i.emit("dispose")
            }, i;

            function t() {
                n();
                var e = r.width,
                    t = r.height;
                o[0] = Math.ceil(e / n.scale), o[1] = Math.ceil(t / n.scale), i.emit("resize")
            }
        }
    }, {
        "canvas-fit": 11,
        "raf-loop": 59
    }],
    4: [function(e, t, r) {
        "use strict";

        function s(e) {
            return function(e) {
                if (Array.isArray(e)) return n(e)
            }(e) || function(e) {
                if ("undefined" != typeof Symbol && null != e[Symbol.iterator] || null != e["@@iterator"]) return Array.from(e)
            }(e) || function(e, t) {
                if (e) {
                    if ("string" == typeof e) return n(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    return "Map" === (r = "Object" === r && e.constructor ? e.constructor.name : r) || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? n(e, t) : void 0
                }
            }(e) || function() {
                throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }()
        }

        function n(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) n[r] = e[r];
            return n
        }

        function i(e) {
            p();
            for (var t = Math.random() < .5 ? 0 : 1 + Math.floor(Math.random() * (u.numColors - 1)), r = t ? 0 : 1 + Math.floor(Math.random() * (u.numColors - 1)), n = 0; n < e[3]; n++)
                for (var i = 0; i < e[2]; i++) {
                    var o = i + e[0] + (n + e[1]) * f;
                    a[o] = i % (l + h) <= l && n % (l + h) <= l ? r : t
                }
        }

        function o(e) {
            for (; 0 < c.length;) {
                var t = Math.floor(Math.random() * c.length),
                    r = c[t];
                n = r, e.length, r = a = o = i = void 0, o = n[0], a = n[1], r = n[2], n = n[3], Math.random() < .5 ? ((i = Math.floor(Math.random() * r)) >= u.rectWidthMin && Math.random() < u.splitDepthVertical && g(o, a, i, n), r - i >= u.rectWidthMin && Math.random() < u.splitDepthVertical && g(o + i, a, r - i, n)) : ((i = Math.floor(Math.random() * n)) >= u.rectHeightMin && Math.random() < u.splitDepthHorizontal && g(o, a, r, i), n - i >= u.rectHeightMin && Math.random() < u.splitDepthHorizontal && g(o, a + i, r, n - i));
                t = c.splice(t, 1);
                e.push.apply(e, s(t))
            }
            var n, i, o, a
        }
        var a = [],
            f = 0,
            c = [],
            u = {
                pixelSizeMin: 0,
                pixelSizeMax: 1,
                gapSizeMin: 1,
                gapSizeMax: 16,
                rectWidthMin: 16,
                rectHeightMin: 16,
                splitDepthVertical: .9,
                splitDepthHorizontal: .9,
                numColors: 8
            },
            l = 1,
            h = 1,
            g = function(e, t, r, n) {
                n = [e, t, r, n];
                i(n), c.push(n)
            },
            p = function() {
                l = Math.floor(Math.random() * (u.pixelSizeMax - u.pixelSizeMin)) + u.pixelSizeMin, h = Math.floor(Math.random() * (u.gapSizeMax - u.gapSizeMin)) + u.gapSizeMin
            };
        t.exports = function(e, t) {
            u = t, a = new Array(e[0] * e[1]), f = e[0], g(0, 0, e[0], e[1]);
            t = [];
            return o(t), t.length <= 1 && (g(0, 0, e[0], .5 * e[0]), o(t)), {
                grid: a,
                rects: t
            }
        }
    }, {}],
    5: [function(e, t, r) {
        "use strict";
        var n = "undefined" == typeof WeakMap ? e("weak-map") : WeakMap,
            i = e("gl-buffer"),
            o = e("gl-vao"),
            a = new n;
        t.exports = function(e) {
            var t = a.get(e),
                r = t && (t._triangleBuffer.handle || t._triangleBuffer.buffer);
            r && e.isBuffer(r) || (r = i(e, new Float32Array([-1, -1, -1, 4, 4, -1])), (t = o(e, [{
                buffer: r,
                type: e.FLOAT,
                size: 2
            }]))._triangleBuffer = r, a.set(e, t)), t.bind(), e.drawArrays(e.TRIANGLES, 0, 3), t.unbind()
        }
    }, {
        "gl-buffer": 20,
        "gl-vao": 38,
        "weak-map": 66
    }],
    6: [function(e, t, r) {
        var a = e("pad-left");
        t.exports = function(e, n, i) {
            n = "number" == typeof n ? n : 1, i = i || ": ";
            var e = e.split(/\r?\n/),
                o = String(e.length + n - 1).length;
            return e.map(function(e, t) {
                var r = t + n,
                    t = String(r).length;
                return a(r, o - t) + i + e
            }).join("\n")
        }
    }, {
        "pad-left": 56
    }],
    7: [function(e, t, r) {
        t.exports = function(e) {
            return atob(e)
        }
    }, {}],
    8: [function(e, t, r) {
        "use strict";
        r.byteLength = function(e) {
            var t = u(e),
                e = t[0],
                t = t[1];
            return 3 * (e + t) / 4 - t
        }, r.toByteArray = function(e) {
            var t, r, n = u(e),
                i = n[0],
                n = n[1],
                o = new c(function(e, t) {
                    return 3 * (e + t) / 4 - t
                }(i, n)),
                a = 0,
                s = 0 < n ? i - 4 : i;
            for (r = 0; r < s; r += 4) t = f[e.charCodeAt(r)] << 18 | f[e.charCodeAt(r + 1)] << 12 | f[e.charCodeAt(r + 2)] << 6 | f[e.charCodeAt(r + 3)], o[a++] = t >> 16 & 255, o[a++] = t >> 8 & 255, o[a++] = 255 & t;
            2 === n && (t = f[e.charCodeAt(r)] << 2 | f[e.charCodeAt(r + 1)] >> 4, o[a++] = 255 & t);
            1 === n && (t = f[e.charCodeAt(r)] << 10 | f[e.charCodeAt(r + 1)] << 4 | f[e.charCodeAt(r + 2)] >> 2, o[a++] = t >> 8 & 255, o[a++] = 255 & t);
            return o
        }, r.fromByteArray = function(e) {
            for (var t, r = e.length, n = r % 3, i = [], o = 0, a = r - n; o < a; o += 16383) i.push(function(e, t, r) {
                for (var n, i = [], o = t; o < r; o += 3) n = (e[o] << 16 & 16711680) + (e[o + 1] << 8 & 65280) + (255 & e[o + 2]), i.push(function(e) {
                    return s[e >> 18 & 63] + s[e >> 12 & 63] + s[e >> 6 & 63] + s[63 & e]
                }(n));
                return i.join("")
            }(e, o, a < o + 16383 ? a : o + 16383));
            1 == n ? (t = e[r - 1], i.push(s[t >> 2] + s[t << 4 & 63] + "==")) : 2 == n && (t = (e[r - 2] << 8) + e[r - 1], i.push(s[t >> 10] + s[t >> 4 & 63] + s[t << 2 & 63] + "="));
            return i.join("")
        };
        for (var s = [], f = [], c = "undefined" != typeof Uint8Array ? Uint8Array : Array, n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", i = 0, o = n.length; i < o; ++i) s[i] = n[i], f[n.charCodeAt(i)] = i;

        function u(e) {
            var t = e.length;
            if (0 < t % 4) throw new Error("Invalid string. Length must be a multiple of 4");
            e = e.indexOf("=");
            return [e = -1 === e ? t : e, e === t ? 0 : 4 - e % 4]
        }
        f["-".charCodeAt(0)] = 62, f["_".charCodeAt(0)] = 63
    }, {}],
    9: [function(e, t, r) {
        "use strict";

        function n(e) {
            var t = 32;
            return (e &= -e) && t--, 65535 & e && (t -= 16), 16711935 & e && (t -= 8), 252645135 & e && (t -= 4), 858993459 & e && (t -= 2), 1431655765 & e && --t, t
        }
        r.INT_BITS = 32, r.INT_MAX = 2147483647, r.INT_MIN = -1 << 31, r.sign = function(e) {
            return (0 < e) - (e < 0)
        }, r.abs = function(e) {
            var t = e >> 31;
            return (e ^ t) - t
        }, r.min = function(e, t) {
            return t ^ (e ^ t) & -(e < t)
        }, r.max = function(e, t) {
            return e ^ (e ^ t) & -(e < t)
        }, r.isPow2 = function(e) {
            return !(e & e - 1 || !e)
        }, r.log2 = function(e) {
            var t, r = (65535 < e) << 4;
            return r |= t = (255 < (e >>>= r)) << 3, r |= t = (15 < (e >>>= t)) << 2, (r |= t = (3 < (e >>>= t)) << 1) | (e >>>= t) >> 1
        }, r.log10 = function(e) {
            return 1e9 <= e ? 9 : 1e8 <= e ? 8 : 1e7 <= e ? 7 : 1e6 <= e ? 6 : 1e5 <= e ? 5 : 1e4 <= e ? 4 : 1e3 <= e ? 3 : 100 <= e ? 2 : 10 <= e ? 1 : 0
        }, r.popCount = function(e) {
            return 16843009 * ((e = (858993459 & (e -= e >>> 1 & 1431655765)) + (e >>> 2 & 858993459)) + (e >>> 4) & 252645135) >>> 24
        }, r.countTrailingZeros = n, r.nextPow2 = function(e) {
            return e += 0 === e, --e, e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, (e |= e >>> 16) + 1
        }, r.prevPow2 = function(e) {
            return e |= e >>> 1, e |= e >>> 2, e |= e >>> 4, e |= e >>> 8, (e |= e >>> 16) - (e >>> 1)
        }, r.parity = function(e) {
            return e ^= e >>> 16, e ^= e >>> 8, e ^= e >>> 4, 27030 >>> (e &= 15) & 1
        };
        var i = new Array(256);
        ! function(e) {
            for (var t = 0; t < 256; ++t) {
                var r = t,
                    n = t,
                    i = 7;
                for (r >>>= 1; r; r >>>= 1) n <<= 1, n |= 1 & r, --i;
                e[t] = n << i & 255
            }
        }(i), r.reverse = function(e) {
            return i[255 & e] << 24 | i[e >>> 8 & 255] << 16 | i[e >>> 16 & 255] << 8 | i[e >>> 24 & 255]
        }, r.interleave2 = function(e, t) {
            return (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e &= 65535) | e << 8)) | e << 4)) | e << 2)) | e << 1)) | (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t &= 65535) | t << 8)) | t << 4)) | t << 2)) | t << 1)) << 1
        }, r.deinterleave2 = function(e, t) {
            return (e = 65535 & ((e = 16711935 & ((e = 252645135 & ((e = 858993459 & ((e = e >>> t & 1431655765) | e >>> 1)) | e >>> 2)) | e >>> 4)) | e >>> 16)) << 16 >> 16
        }, r.interleave3 = function(e, t, r) {
            return e = 1227133513 & ((e = 3272356035 & ((e = 251719695 & ((e = 4278190335 & ((e &= 1023) | e << 16)) | e << 8)) | e << 4)) | e << 2), (e |= (t = 1227133513 & ((t = 3272356035 & ((t = 251719695 & ((t = 4278190335 & ((t &= 1023) | t << 16)) | t << 8)) | t << 4)) | t << 2)) << 1) | (r = 1227133513 & ((r = 3272356035 & ((r = 251719695 & ((r = 4278190335 & ((r &= 1023) | r << 16)) | r << 8)) | r << 4)) | r << 2)) << 2
        }, r.deinterleave3 = function(e, t) {
            return (e = 1023 & ((e = 4278190335 & ((e = 251719695 & ((e = 3272356035 & ((e = e >>> t & 1227133513) | e >>> 2)) | e >>> 4)) | e >>> 8)) | e >>> 16)) << 22 >> 22
        }, r.nextCombination = function(e) {
            var t = e | e - 1;
            return 1 + t | (~t & -~t) - 1 >>> n(e) + 1
        }
    }, {}],
    10: [function(U, e, N) {
        ! function(e) {
            ! function() {
                "use strict";
                var s = U("base64-js"),
                    o = U("ieee754");
                N.Buffer = l, N.SlowBuffer = function(e) {
                    +e != e && (e = 0);
                    return l.alloc(+e)
                }, N.INSPECT_MAX_BYTES = 50;
                var t = 2147483647;

                function i(e) {
                    if (t < e) throw new RangeError('The value "' + e + '" is invalid for option "size"');
                    e = new Uint8Array(e);
                    return e.__proto__ = l.prototype, e
                }

                function l(e, t, r) {
                    if ("number" != typeof e) return n(e, t, r);
                    if ("string" == typeof t) throw new TypeError('The "string" argument must be of type string. Received type number');
                    return f(e)
                }

                function n(e, t, r) {
                    if ("string" == typeof e) return function(e, t) {
                        "string" == typeof t && "" !== t || (t = "utf8");
                        if (!l.isEncoding(t)) throw new TypeError("Unknown encoding: " + t);
                        var r = 0 | h(e, t),
                            n = i(r),
                            t = n.write(e, t);
                        t !== r && (n = n.slice(0, t));
                        return n
                    }(e, t);
                    if (ArrayBuffer.isView(e)) return c(e);
                    if (null == e) throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e);
                    if (S(e, ArrayBuffer) || e && S(e.buffer, ArrayBuffer)) return function(e, t, r) {
                        if (t < 0 || e.byteLength < t) throw new RangeError('"offset" is outside of buffer bounds');
                        if (e.byteLength < t + (r || 0)) throw new RangeError('"length" is outside of buffer bounds');
                        r = void 0 === t && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, t) : new Uint8Array(e, t, r);
                        return r.__proto__ = l.prototype, r
                    }(e, t, r);
                    if ("number" == typeof e) throw new TypeError('The "value" argument must not be of type number. Received type number');
                    var n = e.valueOf && e.valueOf();
                    if (null != n && n !== e) return l.from(n, t, r);
                    n = function(e) {
                        if (l.isBuffer(e)) {
                            var t = 0 | u(e.length),
                                r = i(t);
                            return 0 === r.length ? r : (e.copy(r, 0, 0, t), r)
                        }
                        if (void 0 !== e.length) return "number" != typeof e.length || M(e.length) ? i(0) : c(e);
                        if ("Buffer" === e.type && Array.isArray(e.data)) return c(e.data)
                    }(e);
                    if (n) return n;
                    if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e[Symbol.toPrimitive]) return l.from(e[Symbol.toPrimitive]("string"), t, r);
                    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e)
                }

                function a(e) {
                    if ("number" != typeof e) throw new TypeError('"size" argument must be of type number');
                    if (e < 0) throw new RangeError('The value "' + e + '" is invalid for option "size"')
                }

                function f(e) {
                    return a(e), i(e < 0 ? 0 : 0 | u(e))
                }

                function c(e) {
                    for (var t = e.length < 0 ? 0 : 0 | u(e.length), r = i(t), n = 0; n < t; n += 1) r[n] = 255 & e[n];
                    return r
                }

                function u(e) {
                    if (t <= e) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + t.toString(16) + " bytes");
                    return 0 | e
                }

                function h(e, t) {
                    if (l.isBuffer(e)) return e.length;
                    if (ArrayBuffer.isView(e) || S(e, ArrayBuffer)) return e.byteLength;
                    if ("string" != typeof e) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e);
                    var r = e.length,
                        n = 2 < arguments.length && !0 === arguments[2];
                    if (!n && 0 === r) return 0;
                    for (var i = !1;;) switch (t) {
                        case "ascii":
                        case "latin1":
                        case "binary":
                            return r;
                        case "utf8":
                        case "utf-8":
                            return R(e).length;
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return 2 * r;
                        case "hex":
                            return r >>> 1;
                        case "base64":
                            return P(e).length;
                        default:
                            if (i) return n ? -1 : R(e).length;
                            t = ("" + t).toLowerCase(), i = !0
                    }
                }

                function r(e, t, r) {
                    var n, i, o, a = !1;
                    if ((t = void 0 === t || t < 0 ? 0 : t) > this.length) return "";
                    if ((r = void 0 === r || r > this.length ? this.length : r) <= 0) return "";
                    if ((r >>>= 0) <= (t >>>= 0)) return "";
                    for (e = e || "utf8";;) switch (e) {
                        case "hex":
                            return function(e, t, r) {
                                var n = e.length;
                                (!t || t < 0) && (t = 0);
                                (!r || r < 0 || n < r) && (r = n);
                                for (var i = "", o = t; o < r; ++o) i += function(e) {
                                    return e < 16 ? "0" + e.toString(16) : e.toString(16)
                                }(e[o]);
                                return i
                            }(this, t, r);
                        case "utf8":
                        case "utf-8":
                            return _(this, t, r);
                        case "ascii":
                            return function(e, t, r) {
                                var n = "";
                                r = Math.min(e.length, r);
                                for (var i = t; i < r; ++i) n += String.fromCharCode(127 & e[i]);
                                return n
                            }(this, t, r);
                        case "latin1":
                        case "binary":
                            return function(e, t, r) {
                                var n = "";
                                r = Math.min(e.length, r);
                                for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
                                return n
                            }(this, t, r);
                        case "base64":
                            return n = this, o = r, 0 === (i = t) && o === n.length ? s.fromByteArray(n) : s.fromByteArray(n.slice(i, o));
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return function(e, t, r) {
                                for (var n = e.slice(t, r), i = "", o = 0; o < n.length; o += 2) i += String.fromCharCode(n[o] + 256 * n[o + 1]);
                                return i
                            }(this, t, r);
                        default:
                            if (a) throw new TypeError("Unknown encoding: " + e);
                            e = (e + "").toLowerCase(), a = !0
                    }
                }

                function g(e, t, r) {
                    var n = e[t];
                    e[t] = e[r], e[r] = n
                }

                function p(e, t, r, n, i) {
                    if (0 === e.length) return -1;
                    if ("string" == typeof r ? (n = r, r = 0) : 2147483647 < r ? r = 2147483647 : r < -2147483648 && (r = -2147483648), (r = (r = M(r = +r) ? i ? 0 : e.length - 1 : r) < 0 ? e.length + r : r) >= e.length) {
                        if (i) return -1;
                        r = e.length - 1
                    } else if (r < 0) {
                        if (!i) return -1;
                        r = 0
                    }
                    if ("string" == typeof t && (t = l.from(t, n)), l.isBuffer(t)) return 0 === t.length ? -1 : v(e, t, r, n, i);
                    if ("number" == typeof t) return t &= 255, "function" == typeof Uint8Array.prototype.indexOf ? (i ? Uint8Array.prototype.indexOf : Uint8Array.prototype.lastIndexOf).call(e, t, r) : v(e, [t], r, n, i);
                    throw new TypeError("val must be string, number or Buffer")
                }

                function v(e, t, r, n, i) {
                    var o = 1,
                        a = e.length,
                        s = t.length;
                    if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                        if (e.length < 2 || t.length < 2) return -1;
                        a /= o = 2, s /= 2, r /= 2
                    }

                    function f(e, t) {
                        return 1 === o ? e[t] : e.readUInt16BE(t * o)
                    }
                    if (i)
                        for (var c = -1, u = r; u < a; u++)
                            if (f(e, u) === f(t, -1 === c ? 0 : u - c)) {
                                if (u - (c = -1 === c ? u : c) + 1 === s) return c * o
                            } else -1 !== c && (u -= u - c), c = -1;
                    else
                        for (u = r = a < r + s ? a - s : r; 0 <= u; u--) {
                            for (var l = !0, h = 0; h < s; h++)
                                if (f(e, u + h) !== f(t, h)) {
                                    l = !1;
                                    break
                                } if (l) return u
                        }
                    return -1
                }

                function d(e, t, r, n) {
                    return I(function(e) {
                        for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                        return t
                    }(t), e, r, n)
                }

                function y(e, t, r, n) {
                    return I(function(e, t) {
                        for (var r, n, i = [], o = 0; o < e.length && !((t -= 2) < 0); ++o) n = e.charCodeAt(o), r = n >> 8, n = n % 256, i.push(n), i.push(r);
                        return i
                    }(t, e.length - r), e, r, n)
                }

                function _(e, t, r) {
                    r = Math.min(e.length, r);
                    for (var n = [], i = t; i < r;) {
                        var o, a, s, f, c = e[i],
                            u = null,
                            l = 239 < c ? 4 : 223 < c ? 3 : 191 < c ? 2 : 1;
                        if (i + l <= r) switch (l) {
                            case 1:
                                c < 128 && (u = c);
                                break;
                            case 2:
                                128 == (192 & (o = e[i + 1])) && 127 < (f = (31 & c) << 6 | 63 & o) && (u = f);
                                break;
                            case 3:
                                o = e[i + 1], a = e[i + 2], 128 == (192 & o) && 128 == (192 & a) && 2047 < (f = (15 & c) << 12 | (63 & o) << 6 | 63 & a) && (f < 55296 || 57343 < f) && (u = f);
                                break;
                            case 4:
                                o = e[i + 1], a = e[i + 2], s = e[i + 3], 128 == (192 & o) && 128 == (192 & a) && 128 == (192 & s) && 65535 < (f = (15 & c) << 18 | (63 & o) << 12 | (63 & a) << 6 | 63 & s) && f < 1114112 && (u = f)
                        }
                        null === u ? (u = 65533, l = 1) : 65535 < u && (u -= 65536, n.push(u >>> 10 & 1023 | 55296), u = 56320 | 1023 & u), n.push(u), i += l
                    }
                    return function(e) {
                        var t = e.length;
                        if (t <= x) return String.fromCharCode.apply(String, e);
                        var r = "",
                            n = 0;
                        for (; n < t;) r += String.fromCharCode.apply(String, e.slice(n, n += x));
                        return r
                    }(n)
                }
                N.kMaxLength = t, (l.TYPED_ARRAY_SUPPORT = function() {
                    try {
                        var e = new Uint8Array(1);
                        return e.__proto__ = {
                            __proto__: Uint8Array.prototype,
                            foo: function() {
                                return 42
                            }
                        }, 42 === e.foo()
                    } catch (e) {
                        return !1
                    }
                }()) || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(l.prototype, "parent", {
                    enumerable: !0,
                    get: function() {
                        if (l.isBuffer(this)) return this.buffer
                    }
                }), Object.defineProperty(l.prototype, "offset", {
                    enumerable: !0,
                    get: function() {
                        if (l.isBuffer(this)) return this.byteOffset
                    }
                }), "undefined" != typeof Symbol && null != Symbol.species && l[Symbol.species] === l && Object.defineProperty(l, Symbol.species, {
                    value: null,
                    configurable: !0,
                    enumerable: !1,
                    writable: !1
                }), l.poolSize = 8192, l.from = n, l.prototype.__proto__ = Uint8Array.prototype, l.__proto__ = Uint8Array, l.alloc = function(e, t, r) {
                    return t = t, r = r, a(e = e), !(e <= 0) && void 0 !== t ? "string" == typeof r ? i(e).fill(t, r) : i(e).fill(t) : i(e)
                }, l.allocUnsafe = f, l.allocUnsafeSlow = f, l.isBuffer = function(e) {
                    return null != e && !0 === e._isBuffer && e !== l.prototype
                }, l.compare = function(e, t) {
                    if (S(e, Uint8Array) && (e = l.from(e, e.offset, e.byteLength)), S(t, Uint8Array) && (t = l.from(t, t.offset, t.byteLength)), !l.isBuffer(e) || !l.isBuffer(t)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
                    if (e === t) return 0;
                    for (var r = e.length, n = t.length, i = 0, o = Math.min(r, n); i < o; ++i)
                        if (e[i] !== t[i]) {
                            r = e[i], n = t[i];
                            break
                        } return r < n ? -1 : n < r ? 1 : 0
                }, l.isEncoding = function(e) {
                    switch (String(e).toLowerCase()) {
                        case "hex":
                        case "utf8":
                        case "utf-8":
                        case "ascii":
                        case "latin1":
                        case "binary":
                        case "base64":
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return !0;
                        default:
                            return !1
                    }
                }, l.concat = function(e, t) {
                    if (!Array.isArray(e)) throw new TypeError('"list" argument must be an Array of Buffers');
                    if (0 === e.length) return l.alloc(0);
                    if (void 0 === t)
                        for (i = t = 0; i < e.length; ++i) t += e[i].length;
                    for (var r = l.allocUnsafe(t), n = 0, i = 0; i < e.length; ++i) {
                        var o = e[i];
                        if (S(o, Uint8Array) && (o = l.from(o)), !l.isBuffer(o)) throw new TypeError('"list" argument must be an Array of Buffers');
                        o.copy(r, n), n += o.length
                    }
                    return r
                }, l.byteLength = h, l.prototype._isBuffer = !0, l.prototype.swap16 = function() {
                    var e = this.length;
                    if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                    for (var t = 0; t < e; t += 2) g(this, t, t + 1);
                    return this
                }, l.prototype.swap32 = function() {
                    var e = this.length;
                    if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                    for (var t = 0; t < e; t += 4) g(this, t, t + 3), g(this, t + 1, t + 2);
                    return this
                }, l.prototype.swap64 = function() {
                    var e = this.length;
                    if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                    for (var t = 0; t < e; t += 8) g(this, t, t + 7), g(this, t + 1, t + 6), g(this, t + 2, t + 5), g(this, t + 3, t + 4);
                    return this
                }, l.prototype.toLocaleString = l.prototype.toString = function() {
                    var e = this.length;
                    return 0 === e ? "" : 0 === arguments.length ? _(this, 0, e) : r.apply(this, arguments)
                }, l.prototype.equals = function(e) {
                    if (!l.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
                    return this === e || 0 === l.compare(this, e)
                }, l.prototype.inspect = function() {
                    var e = "",
                        t = N.INSPECT_MAX_BYTES,
                        e = this.toString("hex", 0, t).replace(/(.{2})/g, "$1 ").trim();
                    return this.length > t && (e += " ... "), "<Buffer " + e + ">"
                }, l.prototype.compare = function(e, t, r, n, i) {
                    if (S(e, Uint8Array) && (e = l.from(e, e.offset, e.byteLength)), !l.isBuffer(e)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e);
                    if (void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), (t = void 0 === t ? 0 : t) < 0 || r > e.length || n < 0 || i > this.length) throw new RangeError("out of range index");
                    if (i <= n && r <= t) return 0;
                    if (i <= n) return -1;
                    if (r <= t) return 1;
                    if (this === e) return 0;
                    for (var o = (i >>>= 0) - (n >>>= 0), a = (r >>>= 0) - (t >>>= 0), s = Math.min(o, a), f = this.slice(n, i), c = e.slice(t, r), u = 0; u < s; ++u)
                        if (f[u] !== c[u]) {
                            o = f[u], a = c[u];
                            break
                        } return o < a ? -1 : a < o ? 1 : 0
                }, l.prototype.includes = function(e, t, r) {
                    return -1 !== this.indexOf(e, t, r)
                }, l.prototype.indexOf = function(e, t, r) {
                    return p(this, e, t, r, !0)
                }, l.prototype.lastIndexOf = function(e, t, r) {
                    return p(this, e, t, r, !1)
                }, l.prototype.write = function(e, t, r, n) {
                    if (void 0 === t) n = "utf8", r = this.length, t = 0;
                    else if (void 0 === r && "string" == typeof t) n = t, r = this.length, t = 0;
                    else {
                        if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                        t >>>= 0, isFinite(r) ? (r >>>= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
                    }
                    var i = this.length - t;
                    if ((void 0 === r || i < r) && (r = i), 0 < e.length && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
                    n = n || "utf8";
                    for (var o, a, s, f = !1;;) switch (n) {
                        case "hex":
                            return function(e, t, r, n) {
                                r = Number(r) || 0;
                                var i = e.length - r;
                                (!n || i < (n = Number(n))) && (n = i), (i = t.length) / 2 < n && (n = i / 2);
                                for (var o = 0; o < n; ++o) {
                                    var a = parseInt(t.substr(2 * o, 2), 16);
                                    if (M(a)) return o;
                                    e[r + o] = a
                                }
                                return o
                            }(this, e, t, r);
                        case "utf8":
                        case "utf-8":
                            return a = t, s = r, I(R(e, (o = this).length - a), o, a, s);
                        case "ascii":
                            return d(this, e, t, r);
                        case "latin1":
                        case "binary":
                            return d(this, e, t, r);
                        case "base64":
                            return o = this, a = t, s = r, I(P(e), o, a, s);
                        case "ucs2":
                        case "ucs-2":
                        case "utf16le":
                        case "utf-16le":
                            return y(this, e, t, r);
                        default:
                            if (f) throw new TypeError("Unknown encoding: " + n);
                            n = ("" + n).toLowerCase(), f = !0
                    }
                }, l.prototype.toJSON = function() {
                    return {
                        type: "Buffer",
                        data: Array.prototype.slice.call(this._arr || this, 0)
                    }
                };
                var x = 4096;

                function m(e, t, r) {
                    if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
                    if (r < e + t) throw new RangeError("Trying to access beyond buffer length")
                }

                function E(e, t, r, n, i, o) {
                    if (!l.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (i < t || t < o) throw new RangeError('"value" argument is out of bounds');
                    if (r + n > e.length) throw new RangeError("Index out of range")
                }

                function b(e, t, r, n) {
                    if (r + n > e.length) throw new RangeError("Index out of range");
                    if (r < 0) throw new RangeError("Index out of range")
                }

                function w(e, t, r, n, i) {
                    return t = +t, r >>>= 0, i || b(e, 0, r, 4), o.write(e, t, r, n, 23, 4), r + 4
                }

                function A(e, t, r, n, i) {
                    return t = +t, r >>>= 0, i || b(e, 0, r, 8), o.write(e, t, r, n, 52, 8), r + 8
                }
                l.prototype.slice = function(e, t) {
                    var r = this.length;
                    (e = ~~e) < 0 ? (e += r) < 0 && (e = 0) : r < e && (e = r), (t = void 0 === t ? r : ~~t) < 0 ? (t += r) < 0 && (t = 0) : r < t && (t = r), t < e && (t = e);
                    t = this.subarray(e, t);
                    return t.__proto__ = l.prototype, t
                }, l.prototype.readUIntLE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || m(e, t, this.length);
                    for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                    return n
                }, l.prototype.readUIntBE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || m(e, t, this.length);
                    for (var n = this[e + --t], i = 1; 0 < t && (i *= 256);) n += this[e + --t] * i;
                    return n
                }, l.prototype.readUInt8 = function(e, t) {
                    return e >>>= 0, t || m(e, 1, this.length), this[e]
                }, l.prototype.readUInt16LE = function(e, t) {
                    return e >>>= 0, t || m(e, 2, this.length), this[e] | this[e + 1] << 8
                }, l.prototype.readUInt16BE = function(e, t) {
                    return e >>>= 0, t || m(e, 2, this.length), this[e] << 8 | this[e + 1]
                }, l.prototype.readUInt32LE = function(e, t) {
                    return e >>>= 0, t || m(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3]
                }, l.prototype.readUInt32BE = function(e, t) {
                    return e >>>= 0, t || m(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3])
                }, l.prototype.readIntLE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || m(e, t, this.length);
                    for (var n = this[e], i = 1, o = 0; ++o < t && (i *= 256);) n += this[e + o] * i;
                    return (i *= 128) <= n && (n -= Math.pow(2, 8 * t)), n
                }, l.prototype.readIntBE = function(e, t, r) {
                    e >>>= 0, t >>>= 0, r || m(e, t, this.length);
                    for (var n = t, i = 1, o = this[e + --n]; 0 < n && (i *= 256);) o += this[e + --n] * i;
                    return (i *= 128) <= o && (o -= Math.pow(2, 8 * t)), o
                }, l.prototype.readInt8 = function(e, t) {
                    return e >>>= 0, t || m(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e]
                }, l.prototype.readInt16LE = function(e, t) {
                    e >>>= 0, t || m(e, 2, this.length);
                    e = this[e] | this[e + 1] << 8;
                    return 32768 & e ? 4294901760 | e : e
                }, l.prototype.readInt16BE = function(e, t) {
                    e >>>= 0, t || m(e, 2, this.length);
                    e = this[e + 1] | this[e] << 8;
                    return 32768 & e ? 4294901760 | e : e
                }, l.prototype.readInt32LE = function(e, t) {
                    return e >>>= 0, t || m(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24
                }, l.prototype.readInt32BE = function(e, t) {
                    return e >>>= 0, t || m(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]
                }, l.prototype.readFloatLE = function(e, t) {
                    return e >>>= 0, t || m(e, 4, this.length), o.read(this, e, !0, 23, 4)
                }, l.prototype.readFloatBE = function(e, t) {
                    return e >>>= 0, t || m(e, 4, this.length), o.read(this, e, !1, 23, 4)
                }, l.prototype.readDoubleLE = function(e, t) {
                    return e >>>= 0, t || m(e, 8, this.length), o.read(this, e, !0, 52, 8)
                }, l.prototype.readDoubleBE = function(e, t) {
                    return e >>>= 0, t || m(e, 8, this.length), o.read(this, e, !1, 52, 8)
                }, l.prototype.writeUIntLE = function(e, t, r, n) {
                    e = +e, t >>>= 0, r >>>= 0, n || E(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var i = 1,
                        o = 0;
                    for (this[t] = 255 & e; ++o < r && (i *= 256);) this[t + o] = e / i & 255;
                    return t + r
                }, l.prototype.writeUIntBE = function(e, t, r, n) {
                    e = +e, t >>>= 0, r >>>= 0, n || E(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
                    var i = r - 1,
                        o = 1;
                    for (this[t + i] = 255 & e; 0 <= --i && (o *= 256);) this[t + i] = e / o & 255;
                    return t + r
                }, l.prototype.writeUInt8 = function(e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 1, 255, 0), this[t] = 255 & e, t + 1
                }, l.prototype.writeUInt16LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 2, 65535, 0), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, l.prototype.writeUInt16BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 2, 65535, 0), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, l.prototype.writeUInt32LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 4, 4294967295, 0), this[t + 3] = e >>> 24, this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e, t + 4
                }, l.prototype.writeUInt32BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 4, 4294967295, 0), this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, l.prototype.writeIntLE = function(e, t, r, n) {
                    e = +e, t >>>= 0, n || E(this, e, t, r, (n = Math.pow(2, 8 * r - 1)) - 1, -n);
                    var i = 0,
                        o = 1,
                        a = 0;
                    for (this[t] = 255 & e; ++i < r && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), this[t + i] = (e / o >> 0) - a & 255;
                    return t + r
                }, l.prototype.writeIntBE = function(e, t, r, n) {
                    e = +e, t >>>= 0, n || E(this, e, t, r, (n = Math.pow(2, 8 * r - 1)) - 1, -n);
                    var i = r - 1,
                        o = 1,
                        a = 0;
                    for (this[t + i] = 255 & e; 0 <= --i && (o *= 256);) e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1), this[t + i] = (e / o >> 0) - a & 255;
                    return t + r
                }, l.prototype.writeInt8 = function(e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 1, 127, -128), this[t] = 255 & (e = e < 0 ? 255 + e + 1 : e), t + 1
                }, l.prototype.writeInt16LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 2, 32767, -32768), this[t] = 255 & e, this[t + 1] = e >>> 8, t + 2
                }, l.prototype.writeInt16BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 2, 32767, -32768), this[t] = e >>> 8, this[t + 1] = 255 & e, t + 2
                }, l.prototype.writeInt32LE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 4, 2147483647, -2147483648), this[t] = 255 & e, this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24, t + 4
                }, l.prototype.writeInt32BE = function(e, t, r) {
                    return e = +e, t >>>= 0, r || E(this, e, t, 4, 2147483647, -2147483648), this[t] = (e = e < 0 ? 4294967295 + e + 1 : e) >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e, t + 4
                }, l.prototype.writeFloatLE = function(e, t, r) {
                    return w(this, e, t, !0, r)
                }, l.prototype.writeFloatBE = function(e, t, r) {
                    return w(this, e, t, !1, r)
                }, l.prototype.writeDoubleLE = function(e, t, r) {
                    return A(this, e, t, !0, r)
                }, l.prototype.writeDoubleBE = function(e, t, r) {
                    return A(this, e, t, !1, r)
                }, l.prototype.copy = function(e, t, r, n) {
                    if (!l.isBuffer(e)) throw new TypeError("argument should be a Buffer");
                    if (r = r || 0, n || 0 === n || (n = this.length), t >= e.length && (t = e.length), (n = 0 < n && n < r ? r : n) === r) return 0;
                    if (0 === e.length || 0 === this.length) return 0;
                    if ((t = t || 0) < 0) throw new RangeError("targetStart out of bounds");
                    if (r < 0 || r >= this.length) throw new RangeError("Index out of range");
                    if (n < 0) throw new RangeError("sourceEnd out of bounds");
                    n > this.length && (n = this.length);
                    var i = (n = e.length - t < n - r ? e.length - t + r : n) - r;
                    if (this === e && "function" == typeof Uint8Array.prototype.copyWithin) this.copyWithin(t, r, n);
                    else if (this === e && r < t && t < n)
                        for (var o = i - 1; 0 <= o; --o) e[o + t] = this[o + r];
                    else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
                    return i
                }, l.prototype.fill = function(e, t, r, n) {
                    if ("string" == typeof e) {
                        if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, r = this.length), void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                        if ("string" == typeof n && !l.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
                        var i;
                        1 === e.length && (i = e.charCodeAt(0), ("utf8" === n && i < 128 || "latin1" === n) && (e = i))
                    } else "number" == typeof e && (e &= 255);
                    if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
                    if (r <= t) return this;
                    var o;
                    if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, "number" == typeof(e = e || 0))
                        for (o = t; o < r; ++o) this[o] = e;
                    else {
                        var a = l.isBuffer(e) ? e : l.from(e, n),
                            s = a.length;
                        if (0 === s) throw new TypeError('The value "' + e + '" is invalid for argument "value"');
                        for (o = 0; o < r - t; ++o) this[o + t] = a[o % s]
                    }
                    return this
                };
                var T = /[^+/0-9A-Za-z-_]/g;

                function R(e, t) {
                    var r;
                    t = t || 1 / 0;
                    for (var n = e.length, i = null, o = [], a = 0; a < n; ++a) {
                        if (55295 < (r = e.charCodeAt(a)) && r < 57344) {
                            if (!i) {
                                if (56319 < r) {
                                    -1 < (t -= 3) && o.push(239, 191, 189);
                                    continue
                                }
                                if (a + 1 === n) {
                                    -1 < (t -= 3) && o.push(239, 191, 189);
                                    continue
                                }
                                i = r;
                                continue
                            }
                            if (r < 56320) {
                                -1 < (t -= 3) && o.push(239, 191, 189), i = r;
                                continue
                            }
                            r = 65536 + (i - 55296 << 10 | r - 56320)
                        } else i && -1 < (t -= 3) && o.push(239, 191, 189);
                        if (i = null, r < 128) {
                            if (--t < 0) break;
                            o.push(r)
                        } else if (r < 2048) {
                            if ((t -= 2) < 0) break;
                            o.push(r >> 6 | 192, 63 & r | 128)
                        } else if (r < 65536) {
                            if ((t -= 3) < 0) break;
                            o.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128)
                        } else {
                            if (!(r < 1114112)) throw new Error("Invalid code point");
                            if ((t -= 4) < 0) break;
                            o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128)
                        }
                    }
                    return o
                }

                function P(e) {
                    return s.toByteArray(function(e) {
                        if ((e = (e = e.split("=")[0]).trim().replace(T, "")).length < 2) return "";
                        for (; e.length % 4 != 0;) e += "=";
                        return e
                    }(e))
                }

                function I(e, t, r, n) {
                    for (var i = 0; i < n && !(i + r >= t.length || i >= e.length); ++i) t[i + r] = e[i];
                    return i
                }

                function S(e, t) {
                    return e instanceof t || null != e && null != e.constructor && null != e.constructor.name && e.constructor.name === t.name
                }

                function M(e) {
                    return e != e
                }
            }.call(this)
        }.call(this, U("buffer").Buffer)
    }, {
        "base64-js": 8,
        buffer: 10,
        ieee754: 48
    }],
    11: [function(e, t, r) {
        var s = e("element-size");
        t.exports = function(i, e, t) {
            var o = "SVG" === i.nodeName.toUpperCase();
            return i.style.position = i.style.position || "absolute", i.style.top = 0, i.style.left = 0, a.scale = parseFloat(t || 1), a.parent = e, a();

            function a() {
                var e, t, r, n = a.parent || i.parentNode;
                return r = "function" == typeof n ? (t = (e = n(f) || f)[0], e[1]) : n && n !== document.body ? (t = 0 | (r = s(n))[0], 0 | r[1]) : (t = window.innerWidth, window.innerHeight), o ? (i.setAttribute("width", t * a.scale + "px"), i.setAttribute("height", r * a.scale + "px")) : (i.width = t * a.scale, i.height = r * a.scale), i.style.width = t + "px", i.style.height = r + "px", a
            }
        };
        var f = new Float32Array(2)
    }, {
        "element-size": 17
    }],
    12: [function(e, t, r) {
        "use strict";
        var o = e("./lib/thunk.js");

        function a() {
            this.argTypes = [], this.shimArgs = [], this.arrayArgs = [], this.arrayBlockIndices = [], this.scalarArgs = [], this.offsetArgs = [], this.offsetArgIndex = [], this.indexArgs = [], this.shapeArgs = [], this.funcName = "", this.pre = null, this.body = null, this.post = null, this.debug = !1
        }
        t.exports = function(e) {
            var t = new a;
            t.pre = e.pre, t.body = e.body, t.post = e.post;
            var r = e.args.slice(0);
            t.argTypes = r;
            for (var n = 0; n < r.length; ++n) {
                var i = r[n];
                if ("array" === i || "object" == typeof i && i.blockIndices) {
                    if (t.argTypes[n] = "array", t.arrayArgs.push(n), t.arrayBlockIndices.push(i.blockIndices || 0), t.shimArgs.push("array" + n), n < t.pre.args.length && 0 < t.pre.args[n].count) throw new Error("cwise: pre() block may not reference array args");
                    if (n < t.post.args.length && 0 < t.post.args[n].count) throw new Error("cwise: post() block may not reference array args")
                } else if ("scalar" === i) t.scalarArgs.push(n), t.shimArgs.push("scalar" + n);
                else if ("index" === i) {
                    if (t.indexArgs.push(n), n < t.pre.args.length && 0 < t.pre.args[n].count) throw new Error("cwise: pre() block may not reference array index");
                    if (n < t.body.args.length && t.body.args[n].lvalue) throw new Error("cwise: body() block may not write to array index");
                    if (n < t.post.args.length && 0 < t.post.args[n].count) throw new Error("cwise: post() block may not reference array index")
                } else if ("shape" === i) {
                    if (t.shapeArgs.push(n), n < t.pre.args.length && t.pre.args[n].lvalue) throw new Error("cwise: pre() block may not write to array shape");
                    if (n < t.body.args.length && t.body.args[n].lvalue) throw new Error("cwise: body() block may not write to array shape");
                    if (n < t.post.args.length && t.post.args[n].lvalue) throw new Error("cwise: post() block may not write to array shape")
                } else {
                    if ("object" != typeof i || !i.offset) throw new Error("cwise: Unknown argument type " + r[n]);
                    t.argTypes[n] = "offset", t.offsetArgs.push({
                        array: i.array,
                        offset: i.offset
                    }), t.offsetArgIndex.push(n)
                }
            }
            if (t.arrayArgs.length <= 0) throw new Error("cwise: No array arguments specified");
            if (t.pre.args.length > r.length) throw new Error("cwise: Too many arguments in pre() block");
            if (t.body.args.length > r.length) throw new Error("cwise: Too many arguments in body() block");
            if (t.post.args.length > r.length) throw new Error("cwise: Too many arguments in post() block");
            return t.debug = !!e.printCode || !!e.debug, t.funcName = e.funcName || "cwise", t.blockSize = e.blockSize || 64, o(t)
        }
    }, {
        "./lib/thunk.js": 14
    }],
    13: [function(e, t, r) {
        "use strict";
        var E = e("uniq");

        function b(e, t, r) {
            for (var n, i = e.length, o = t.arrayArgs.length, a = 0 < t.indexArgs.length, s = [], f = [], c = 0, u = 0, l = 0; l < i; ++l) f.push(["i", l, "=0"].join(""));
            for (n = 0; n < o; ++n)
                for (l = 0; l < i; ++l) u = c, c = e[l], 0 === l ? f.push(["d", n, "s", l, "=t", n, "p", c].join("")) : f.push(["d", n, "s", l, "=(t", n, "p", c, "-s", u, "*t", n, "p", u, ")"].join(""));
            for (0 < f.length && s.push("var " + f.join(",")), l = i - 1; 0 <= l; --l) c = e[l], s.push(["for(i", l, "=0;i", l, "<s", c, ";++i", l, "){"].join(""));
            for (s.push(r), l = 0; l < i; ++l) {
                for (u = c, c = e[l], n = 0; n < o; ++n) s.push(["p", n, "+=d", n, "s", l].join(""));
                a && (0 < l && s.push(["index[", u, "]-=s", u].join("")), s.push(["++index[", c, "]"].join(""))), s.push("}")
            }
            return s.join("\n")
        }

        function w(e, t, r) {
            for (var n = e.body, i = [], o = [], a = 0; a < e.args.length; ++a) {
                var s = e.args[a];
                if (!(s.count <= 0)) {
                    var f = new RegExp(s.name, "g"),
                        c = "",
                        u = t.arrayArgs.indexOf(a);
                    switch (t.argTypes[a]) {
                        case "offset":
                            var l = t.offsetArgIndex.indexOf(a),
                                u = t.offsetArgs[l].array,
                                c = "+q" + l;
                        case "array":
                            c = "p" + u + c;
                            var h = "l" + a,
                                l = "a" + u;
                            if (0 === t.arrayBlockIndices[u]) 1 === s.count ? "generic" === r[u] ? s.lvalue ? (i.push(["var ", h, "=", l, ".get(", c, ")"].join("")), n = n.replace(f, h), o.push([l, ".set(", c, ",", h, ")"].join(""))) : n = n.replace(f, [l, ".get(", c, ")"].join("")) : n = n.replace(f, [l, "[", c, "]"].join("")) : "generic" === r[u] ? (i.push(["var ", h, "=", l, ".get(", c, ")"].join("")), n = n.replace(f, h), s.lvalue && o.push([l, ".set(", c, ",", h, ")"].join(""))) : (i.push(["var ", h, "=", l, "[", c, "]"].join("")), n = n.replace(f, h), s.lvalue && o.push([l, "[", c, "]=", h].join("")));
                            else {
                                for (var g = [s.name], p = [c], v = 0; v < Math.abs(t.arrayBlockIndices[u]); v++) g.push("\\s*\\[([^\\]]+)\\]"), p.push("$" + (v + 1) + "*t" + u + "b" + v);
                                if (f = new RegExp(g.join(""), "g"), c = p.join("+"), "generic" === r[u]) throw new Error("cwise: Generic arrays not supported in combination with blocks!");
                                n = n.replace(f, [l, "[", c, "]"].join(""))
                            }
                            break;
                        case "scalar":
                            n = n.replace(f, "Y" + t.scalarArgs.indexOf(a));
                            break;
                        case "index":
                            n = n.replace(f, "index");
                            break;
                        case "shape":
                            n = n.replace(f, "shape")
                    }
                }
            }
            return [i.join("\n"), n, o.join("\n")].join("\n").trim()
        }
        t.exports = function(e, t) {
            for (var r = t[1].length - Math.abs(e.arrayBlockIndices[0]) | 0, n = new Array(e.arrayArgs.length), i = new Array(e.arrayArgs.length), o = 0; o < e.arrayArgs.length; ++o) i[o] = t[2 * o], n[o] = t[2 * o + 1];
            for (var a = [], s = [], f = [], c = [], u = [], o = 0; o < e.arrayArgs.length; ++o) {
                e.arrayBlockIndices[o] < 0 ? (f.push(0), c.push(r), a.push(r), s.push(r + e.arrayBlockIndices[o])) : (f.push(e.arrayBlockIndices[o]), c.push(e.arrayBlockIndices[o] + r), a.push(0), s.push(e.arrayBlockIndices[o]));
                for (var l = [], h = 0; h < n[o].length; h++) f[o] <= n[o][h] && n[o][h] < c[o] && l.push(n[o][h] - f[o]);
                u.push(l)
            }
            for (var g = ["SS"], p = ["'use strict'"], v = [], h = 0; h < r; ++h) v.push(["s", h, "=SS[", h, "]"].join(""));
            for (o = 0; o < e.arrayArgs.length; ++o) {
                g.push("a" + o), g.push("t" + o), g.push("p" + o);
                for (h = 0; h < r; ++h) v.push(["t", o, "p", h, "=t", o, "[", f[o] + h, "]"].join(""));
                for (h = 0; h < Math.abs(e.arrayBlockIndices[o]); ++h) v.push(["t", o, "b", h, "=t", o, "[", a[o] + h, "]"].join(""))
            }
            for (o = 0; o < e.scalarArgs.length; ++o) g.push("Y" + o);
            if (0 < e.shapeArgs.length && v.push("shape=SS.slice(0)"), 0 < e.indexArgs.length) {
                for (var d = new Array(r), o = 0; o < r; ++o) d[o] = "0";
                v.push(["index=[", d.join(","), "]"].join(""))
            }
            for (o = 0; o < e.offsetArgs.length; ++o) {
                for (var y = e.offsetArgs[o], _ = [], h = 0; h < y.offset.length; ++h) 0 !== y.offset[h] && (1 === y.offset[h] ? _.push(["t", y.array, "p", h].join("")) : _.push([y.offset[h], "*t", y.array, "p", h].join("")));
                0 === _.length ? v.push("q" + o + "=0") : v.push(["q", o, "=", _.join("+")].join(""))
            }
            var x = E([].concat(e.pre.thisVars).concat(e.body.thisVars).concat(e.post.thisVars));
            for (0 < (v = v.concat(x)).length && p.push("var " + v.join(",")), o = 0; o < e.arrayArgs.length; ++o) p.push("p" + o + "|=0");
            3 < e.pre.body.length && p.push(w(e.pre, e, i));
            var m = w(e.body, e, i);
            return (x = function(e) {
                for (var t = 0, r = e[0].length; t < r;) {
                    for (var n = 1; n < e.length; ++n)
                        if (e[n][t] !== e[0][t]) return t;
                    ++t
                }
                return t
            }(u)) < r ? p.push(function(e, t, r, n) {
                for (var i = t.length, o = r.arrayArgs.length, a = r.blockSize, s = 0 < r.indexArgs.length, f = [], c = 0; c < o; ++c) f.push(["var offset", c, "=p", c].join(""));
                for (c = e; c < i; ++c) f.push(["for(var j" + c + "=SS[", t[c], "]|0;j", c, ">0;){"].join("")), f.push(["if(j", c, "<", a, "){"].join("")), f.push(["s", t[c], "=j", c].join("")), f.push(["j", c, "=0"].join("")), f.push(["}else{s", t[c], "=", a].join("")), f.push(["j", c, "-=", a, "}"].join("")), s && f.push(["index[", t[c], "]=j", c].join(""));
                for (c = 0; c < o; ++c) {
                    for (var u = ["offset" + c], l = e; l < i; ++l) u.push(["j", l, "*t", c, "p", t[l]].join(""));
                    f.push(["p", c, "=(", u.join("+"), ")"].join(""))
                }
                for (f.push(b(t, r, n)), c = e; c < i; ++c) f.push("}");
                return f.join("\n")
            }(x, u[0], e, m)) : p.push(b(u[0], e, m)), 3 < e.post.body.length && p.push(w(e.post, e, i)), e.debug && console.log("-----Generated cwise routine for ", t, ":\n" + p.join("\n") + "\n----------"), x = [e.funcName || "unnamed", "_cwise_loop_", n[0].join("s"), "m", x, function(e) {
                for (var t = new Array(e.length), r = !0, n = 0; n < e.length; ++n) {
                    var i = e[n],
                        o = (o = i.match(/\d+/)) ? o[0] : "";
                    0 === i.charAt(0) ? t[n] = "u" + i.charAt(1) + o : t[n] = i.charAt(0) + o, 0 < n && (r = r && t[n] === t[n - 1])
                }
                return r ? t[0] : t.join("")
            }(i)].join(""), new Function(["function ", x, "(", g.join(","), "){", p.join("\n"), "} return ", x].join(""))()
        }
    }, {
        uniq: 65
    }],
    14: [function(e, t, r) {
        "use strict";
        var l = e("./compile.js");
        t.exports = function(e) {
            var t = ["'use strict'", "var CACHED={}"],
                r = [],
                n = e.funcName + "_cwise_thunk";
            t.push(["return function ", n, "(", e.shimArgs.join(","), "){"].join(""));
            for (var i = [], o = [], a = [
                    ["array", e.arrayArgs[0], ".shape.slice(", Math.max(0, e.arrayBlockIndices[0]), e.arrayBlockIndices[0] < 0 ? "," + e.arrayBlockIndices[0] + ")" : ")"].join("")
                ], s = [], f = [], c = 0; c < e.arrayArgs.length; ++c) {
                var u = e.arrayArgs[c];
                r.push(["t", u, "=array", u, ".dtype,", "r", u, "=array", u, ".order"].join("")), i.push("t" + u), i.push("r" + u), o.push("t" + u), o.push("r" + u + ".join()"), a.push("array" + u + ".data"), a.push("array" + u + ".stride"), a.push("array" + u + ".offset|0"), 0 < c && (s.push("array" + e.arrayArgs[0] + ".shape.length===array" + u + ".shape.length+" + (Math.abs(e.arrayBlockIndices[0]) - Math.abs(e.arrayBlockIndices[c]))), f.push("array" + e.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0, e.arrayBlockIndices[0]) + "]===array" + u + ".shape[shapeIndex+" + Math.max(0, e.arrayBlockIndices[c]) + "]"))
            }
            for (1 < e.arrayArgs.length && (t.push("if (!(" + s.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')"), t.push("for(var shapeIndex=array" + e.arrayArgs[0] + ".shape.length-" + Math.abs(e.arrayBlockIndices[0]) + "; shapeIndex--\x3e0;) {"), t.push("if (!(" + f.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')"), t.push("}")), c = 0; c < e.scalarArgs.length; ++c) a.push("scalar" + e.scalarArgs[c]);
            return r.push(["type=[", o.join(","), "].join()"].join("")), r.push("proc=CACHED[type]"), t.push("var " + r.join(",")), t.push(["if(!proc){", "CACHED[type]=proc=compile([", i.join(","), "])}", "return proc(", a.join(","), ")}"].join("")), e.debug && console.log("-----Generated thunk:\n" + t.join("\n") + "\n----------"), new Function("compile", t.join("\n"))(l.bind(void 0, e))
        }
    }, {
        "./compile.js": 13
    }],
    15: [function(e, t, r) {
        t.exports = e("cwise-compiler")
    }, {
        "cwise-compiler": 12
    }],
    16: [function(e, t, r) {
        "use strict";
        t.exports = function(e, t) {
            switch (void 0 === t && (t = 0), typeof e) {
                case "number":
                    if (0 < e) return function(e, t) {
                        for (var r = new Array(e), n = 0; n < e; ++n) r[n] = t;
                        return r
                    }(0 | e, t);
                    break;
                case "object":
                    if ("number" == typeof e.length) return function e(t, r, n) {
                        var i = 0 | t[n];
                        if (i <= 0) return [];
                        var o, a = new Array(i);
                        if (n === t.length - 1)
                            for (o = 0; o < i; ++o) a[o] = r;
                        else
                            for (o = 0; o < i; ++o) a[o] = e(t, r, n + 1);
                        return a
                    }(e, t, 0)
            }
            return []
        }
    }, {}],
    17: [function(e, t, r) {
        function o(e) {
            return parseFloat(e) || 0
        }
        t.exports = function(e) {
            if (e === window || e === document.body) return [window.innerWidth, window.innerHeight]; {
                var t;
                e.parentNode || (t = !0, document.body.appendChild(e))
            }
            var r = e.getBoundingClientRect(),
                n = getComputedStyle(e),
                i = (0 | r.height) + o(n.getPropertyValue("margin-top")) + o(n.getPropertyValue("margin-bottom")),
                n = (0 | r.width) + o(n.getPropertyValue("margin-left")) + o(n.getPropertyValue("margin-right"));
            t && document.body.removeChild(e);
            return [n, i]
        }
    }, {}],
    18: [function(e, t, r) {
        "use strict";
        var n = "object" == typeof Reflect ? Reflect : null,
            f = n && "function" == typeof n.apply ? n.apply : function(e, t, r) {
                return Function.prototype.apply.call(e, t, r)
            };
        var i = n && "function" == typeof n.ownKeys ? n.ownKeys : Object.getOwnPropertySymbols ? function(e) {
                return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
            } : function(e) {
                return Object.getOwnPropertyNames(e)
            },
            o = Number.isNaN || function(e) {
                return e != e
            };

        function a() {
            a.init.call(this)
        }
        t.exports = a, t.exports.once = function(s, f) {
            return new Promise(function(e, t) {
                function r(e) {
                    s.removeListener(f, n), t(e)
                }

                function n() {
                    "function" == typeof s.removeListener && s.removeListener("error", r), e([].slice.call(arguments))
                }
                var i, o, a;
                d(s, f, n, {
                    once: !0
                }), "error" !== f && (o = r, a = {
                    once: !0
                }, "function" == typeof(i = s).on && d(i, "error", o, a))
            })
        }, (a.EventEmitter = a).prototype._events = void 0, a.prototype._eventsCount = 0, a.prototype._maxListeners = void 0;
        var s = 10;

        function c(e) {
            if ("function" != typeof e) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e)
        }

        function u(e) {
            return void 0 === e._maxListeners ? a.defaultMaxListeners : e._maxListeners
        }

        function l(e, t, r, n) {
            var i, o;
            return c(r), void 0 === (i = e._events) ? (i = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== i.newListener && (e.emit("newListener", t, r.listener || r), i = e._events), o = i[t]), void 0 === o ? (o = i[t] = r, ++e._eventsCount) : ("function" == typeof o ? o = i[t] = n ? [r, o] : [o, r] : n ? o.unshift(r) : o.push(r), 0 < (r = u(e)) && o.length > r && !o.warned && (o.warned = !0, (r = new Error("Possible EventEmitter memory leak detected. " + o.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit")).name = "MaxListenersExceededWarning", r.emitter = e, r.type = t, r.count = o.length, r = r, console && console.warn && console.warn(r))), e
        }

        function h(e, t, r) {
            e = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: r
            }, t = function() {
                if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
            }.bind(e);
            return t.listener = r, e.wrapFn = t
        }

        function g(e, t, r) {
            e = e._events;
            if (void 0 === e) return [];
            t = e[t];
            return void 0 === t ? [] : "function" == typeof t ? r ? [t.listener || t] : [t] : r ? function(e) {
                for (var t = new Array(e.length), r = 0; r < t.length; ++r) t[r] = e[r].listener || e[r];
                return t
            }(t) : v(t, t.length)
        }

        function p(e) {
            var t = this._events;
            if (void 0 !== t) {
                e = t[e];
                if ("function" == typeof e) return 1;
                if (void 0 !== e) return e.length
            }
            return 0
        }

        function v(e, t) {
            for (var r = new Array(t), n = 0; n < t; ++n) r[n] = e[n];
            return r
        }

        function d(r, n, i, o) {
            if ("function" == typeof r.on) o.once ? r.once(n, i) : r.on(n, i);
            else {
                if ("function" != typeof r.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof r);
                r.addEventListener(n, function e(t) {
                    o.once && r.removeEventListener(n, e), i(t)
                })
            }
        }
        Object.defineProperty(a, "defaultMaxListeners", {
            enumerable: !0,
            get: function() {
                return s
            },
            set: function(e) {
                if ("number" != typeof e || e < 0 || o(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
                s = e
            }
        }), a.init = function() {
            void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
        }, a.prototype.setMaxListeners = function(e) {
            if ("number" != typeof e || e < 0 || o(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
            return this._maxListeners = e, this
        }, a.prototype.getMaxListeners = function() {
            return u(this)
        }, a.prototype.emit = function(e) {
            for (var t = [], r = 1; r < arguments.length; r++) t.push(arguments[r]);
            var n, i = "error" === e,
                o = this._events;
            if (void 0 !== o) i = i && void 0 === o.error;
            else if (!i) return !1;
            if (i) {
                if ((n = 0 < t.length ? t[0] : n) instanceof Error) throw n;
                i = new Error("Unhandled error." + (n ? " (" + n.message + ")" : ""));
                throw i.context = n, i
            }
            e = o[e];
            if (void 0 === e) return !1;
            if ("function" == typeof e) f(e, this, t);
            else
                for (var a = e.length, s = v(e, a), r = 0; r < a; ++r) f(s[r], this, t);
            return !0
        }, a.prototype.on = a.prototype.addListener = function(e, t) {
            return l(this, e, t, !1)
        }, a.prototype.prependListener = function(e, t) {
            return l(this, e, t, !0)
        }, a.prototype.once = function(e, t) {
            return c(t), this.on(e, h(this, e, t)), this
        }, a.prototype.prependOnceListener = function(e, t) {
            return c(t), this.prependListener(e, h(this, e, t)), this
        }, a.prototype.removeListener = function(e, t) {
            var r, n, i, o, a;
            if (c(t), void 0 === (n = this._events)) return this;
            if (void 0 === (r = n[e])) return this;
            if (r === t || r.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete n[e], n.removeListener && this.emit("removeListener", e, r.listener || t));
            else if ("function" != typeof r) {
                for (i = -1, o = r.length - 1; 0 <= o; o--)
                    if (r[o] === t || r[o].listener === t) {
                        a = r[o].listener, i = o;
                        break
                    } if (i < 0) return this;
                0 === i ? r.shift() : function(e, t) {
                    for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                    e.pop()
                }(r, i), 1 === r.length && (n[e] = r[0]), void 0 !== n.removeListener && this.emit("removeListener", e, a || t)
            }
            return this
        }, a.prototype.off = a.prototype.removeListener, a.prototype.removeAllListeners = function(e) {
            var t, r = this._events;
            if (void 0 === r) return this;
            if (void 0 === r.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== r[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete r[e]), this;
            if (0 === arguments.length) {
                for (var n, i = Object.keys(r), o = 0; o < i.length; ++o) "removeListener" !== (n = i[o]) && this.removeAllListeners(n);
                return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
            }
            if ("function" == typeof(t = r[e])) this.removeListener(e, t);
            else if (void 0 !== t)
                for (o = t.length - 1; 0 <= o; o--) this.removeListener(e, t[o]);
            return this
        }, a.prototype.listeners = function(e) {
            return g(this, e, !0)
        }, a.prototype.rawListeners = function(e) {
            return g(this, e, !1)
        }, a.listenerCount = function(e, t) {
            return "function" == typeof e.listenerCount ? e.listenerCount(t) : p.call(e, t)
        }, a.prototype.listenerCount = p, a.prototype.eventNames = function() {
            return 0 < this._eventsCount ? i(this._events) : []
        }
    }, {}],
    19: [function(e, t, r) {
        t.exports = function(e, t) {
            if ("string" != typeof e) throw new TypeError("must specify type string");
            if (t = t || {}, "undefined" == typeof document && !t.canvas) return null;
            var r = t.canvas || document.createElement("canvas");
            "number" == typeof t.width && (r.width = t.width);
            "number" == typeof t.height && (r.height = t.height);
            var n, i = t;
            try {
                var o = [e];
                0 === e.indexOf("webgl") && o.push("experimental-" + e);
                for (var a = 0; a < o.length; a++)
                    if (n = r.getContext(o[a], i)) return n
            } catch (e) {
                n = null
            }
            return n || null
        }
    }, {}],
    20: [function(e, t, r) {
        "use strict";
        var o = e("typedarray-pool"),
            i = e("ndarray-ops"),
            a = e("ndarray"),
            s = ["uint8", "uint8_clamped", "uint16", "uint32", "int8", "int16", "int32", "float32"];

        function f(e, t, r, n, i) {
            this.gl = e, this.type = t, this.handle = r, this.length = n, this.usage = i
        }
        e = f.prototype;

        function c(e, t, r, n, i, o) {
            var a = i.length * i.BYTES_PER_ELEMENT;
            if (o < 0) return e.bufferData(t, i, n), a;
            if (r < a + o) throw new Error("gl-buffer: If resizing buffer, must not specify offset");
            return e.bufferSubData(t, o, i), r
        }

        function u(e, t) {
            for (var r = o.malloc(e.length, t), n = e.length, i = 0; i < n; ++i) r[i] = e[i];
            return r
        }
        e.bind = function() {
            this.gl.bindBuffer(this.type, this.handle)
        }, e.unbind = function() {
            this.gl.bindBuffer(this.type, null)
        }, e.dispose = function() {
            this.gl.deleteBuffer(this.handle)
        }, e.update = function(e, t) {
            if ("number" != typeof t && (t = -1), this.bind(), "object" == typeof e && void 0 !== e.shape) {
                var r = e.dtype;
                s.indexOf(r) < 0 && (r = "float32"), (r = this.type === this.gl.ELEMENT_ARRAY_BUFFER ? gl.getExtension("OES_element_index_uint") && "uint16" !== r ? "uint32" : "uint16" : r) === e.dtype && function(e, t) {
                    for (var r = 1, n = t.length - 1; 0 <= n; --n) {
                        if (t[n] !== r) return;
                        r *= e[n]
                    }
                    return 1
                }(e.shape, e.stride) ? 0 === e.offset && e.data.length === e.shape[0] ? this.length = c(this.gl, this.type, this.length, this.usage, e.data, t) : this.length = c(this.gl, this.type, this.length, this.usage, e.data.subarray(e.offset, e.shape[0]), t) : (n = o.malloc(e.size, r), r = a(n, e.shape), i.assign(r, e), this.length = c(this.gl, this.type, this.length, this.usage, t < 0 ? n : n.subarray(0, e.size), t), o.free(n))
            } else if (Array.isArray(e)) {
                var n = this.type === this.gl.ELEMENT_ARRAY_BUFFER ? u(e, "uint16") : u(e, "float32");
                this.length = c(this.gl, this.type, this.length, this.usage, t < 0 ? n : n.subarray(0, e.length), t), o.free(n)
            } else if ("object" == typeof e && "number" == typeof e.length) this.length = c(this.gl, this.type, this.length, this.usage, e, t);
            else {
                if ("number" != typeof e && void 0 !== e) throw new Error("gl-buffer: Invalid data type");
                if (0 <= t) throw new Error("gl-buffer: Cannot specify offset when resizing buffer");
                this.gl.bufferData(this.type, 0 | (e = (e |= 0) <= 0 ? 1 : e), this.usage), this.length = e
            }
        }, t.exports = function(e, t, r, n) {
            if (r = r || e.ARRAY_BUFFER, n = n || e.DYNAMIC_DRAW, r !== e.ARRAY_BUFFER && r !== e.ELEMENT_ARRAY_BUFFER) throw new Error("gl-buffer: Invalid type for webgl buffer, must be either gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER");
            if (n !== e.DYNAMIC_DRAW && n !== e.STATIC_DRAW && n !== e.STREAM_DRAW) throw new Error("gl-buffer: Invalid usage for buffer, must be either gl.DYNAMIC_DRAW, gl.STATIC_DRAW or gl.STREAM_DRAW");
            var i = e.createBuffer();
            return (n = new f(e, r, i, 0, n)).update(t), n
        }
    }, {
        ndarray: 54,
        "ndarray-ops": 53,
        "typedarray-pool": 64
    }],
    21: [function(e, t, r) {
        t.exports = {
            0: "NONE",
            1: "ONE",
            2: "LINE_LOOP",
            3: "LINE_STRIP",
            4: "TRIANGLES",
            5: "TRIANGLE_STRIP",
            6: "TRIANGLE_FAN",
            256: "DEPTH_BUFFER_BIT",
            512: "NEVER",
            513: "LESS",
            514: "EQUAL",
            515: "LEQUAL",
            516: "GREATER",
            517: "NOTEQUAL",
            518: "GEQUAL",
            519: "ALWAYS",
            768: "SRC_COLOR",
            769: "ONE_MINUS_SRC_COLOR",
            770: "SRC_ALPHA",
            771: "ONE_MINUS_SRC_ALPHA",
            772: "DST_ALPHA",
            773: "ONE_MINUS_DST_ALPHA",
            774: "DST_COLOR",
            775: "ONE_MINUS_DST_COLOR",
            776: "SRC_ALPHA_SATURATE",
            1024: "STENCIL_BUFFER_BIT",
            1028: "FRONT",
            1029: "BACK",
            1032: "FRONT_AND_BACK",
            1280: "INVALID_ENUM",
            1281: "INVALID_VALUE",
            1282: "INVALID_OPERATION",
            1285: "OUT_OF_MEMORY",
            1286: "INVALID_FRAMEBUFFER_OPERATION",
            2304: "CW",
            2305: "CCW",
            2849: "LINE_WIDTH",
            2884: "CULL_FACE",
            2885: "CULL_FACE_MODE",
            2886: "FRONT_FACE",
            2928: "DEPTH_RANGE",
            2929: "DEPTH_TEST",
            2930: "DEPTH_WRITEMASK",
            2931: "DEPTH_CLEAR_VALUE",
            2932: "DEPTH_FUNC",
            2960: "STENCIL_TEST",
            2961: "STENCIL_CLEAR_VALUE",
            2962: "STENCIL_FUNC",
            2963: "STENCIL_VALUE_MASK",
            2964: "STENCIL_FAIL",
            2965: "STENCIL_PASS_DEPTH_FAIL",
            2966: "STENCIL_PASS_DEPTH_PASS",
            2967: "STENCIL_REF",
            2968: "STENCIL_WRITEMASK",
            2978: "VIEWPORT",
            3024: "DITHER",
            3042: "BLEND",
            3088: "SCISSOR_BOX",
            3089: "SCISSOR_TEST",
            3106: "COLOR_CLEAR_VALUE",
            3107: "COLOR_WRITEMASK",
            3317: "UNPACK_ALIGNMENT",
            3333: "PACK_ALIGNMENT",
            3379: "MAX_TEXTURE_SIZE",
            3386: "MAX_VIEWPORT_DIMS",
            3408: "SUBPIXEL_BITS",
            3410: "RED_BITS",
            3411: "GREEN_BITS",
            3412: "BLUE_BITS",
            3413: "ALPHA_BITS",
            3414: "DEPTH_BITS",
            3415: "STENCIL_BITS",
            3553: "TEXTURE_2D",
            4352: "DONT_CARE",
            4353: "FASTEST",
            4354: "NICEST",
            5120: "BYTE",
            5121: "UNSIGNED_BYTE",
            5122: "SHORT",
            5123: "UNSIGNED_SHORT",
            5124: "INT",
            5125: "UNSIGNED_INT",
            5126: "FLOAT",
            5386: "INVERT",
            5890: "TEXTURE",
            6401: "STENCIL_INDEX",
            6402: "DEPTH_COMPONENT",
            6406: "ALPHA",
            6407: "RGB",
            6408: "RGBA",
            6409: "LUMINANCE",
            6410: "LUMINANCE_ALPHA",
            7680: "KEEP",
            7681: "REPLACE",
            7682: "INCR",
            7683: "DECR",
            7936: "VENDOR",
            7937: "RENDERER",
            7938: "VERSION",
            9728: "NEAREST",
            9729: "LINEAR",
            9984: "NEAREST_MIPMAP_NEAREST",
            9985: "LINEAR_MIPMAP_NEAREST",
            9986: "NEAREST_MIPMAP_LINEAR",
            9987: "LINEAR_MIPMAP_LINEAR",
            10240: "TEXTURE_MAG_FILTER",
            10241: "TEXTURE_MIN_FILTER",
            10242: "TEXTURE_WRAP_S",
            10243: "TEXTURE_WRAP_T",
            10497: "REPEAT",
            10752: "POLYGON_OFFSET_UNITS",
            16384: "COLOR_BUFFER_BIT",
            32769: "CONSTANT_COLOR",
            32770: "ONE_MINUS_CONSTANT_COLOR",
            32771: "CONSTANT_ALPHA",
            32772: "ONE_MINUS_CONSTANT_ALPHA",
            32773: "BLEND_COLOR",
            32774: "FUNC_ADD",
            32777: "BLEND_EQUATION_RGB",
            32778: "FUNC_SUBTRACT",
            32779: "FUNC_REVERSE_SUBTRACT",
            32819: "UNSIGNED_SHORT_4_4_4_4",
            32820: "UNSIGNED_SHORT_5_5_5_1",
            32823: "POLYGON_OFFSET_FILL",
            32824: "POLYGON_OFFSET_FACTOR",
            32854: "RGBA4",
            32855: "RGB5_A1",
            32873: "TEXTURE_BINDING_2D",
            32926: "SAMPLE_ALPHA_TO_COVERAGE",
            32928: "SAMPLE_COVERAGE",
            32936: "SAMPLE_BUFFERS",
            32937: "SAMPLES",
            32938: "SAMPLE_COVERAGE_VALUE",
            32939: "SAMPLE_COVERAGE_INVERT",
            32968: "BLEND_DST_RGB",
            32969: "BLEND_SRC_RGB",
            32970: "BLEND_DST_ALPHA",
            32971: "BLEND_SRC_ALPHA",
            33071: "CLAMP_TO_EDGE",
            33170: "GENERATE_MIPMAP_HINT",
            33189: "DEPTH_COMPONENT16",
            33306: "DEPTH_STENCIL_ATTACHMENT",
            33635: "UNSIGNED_SHORT_5_6_5",
            33648: "MIRRORED_REPEAT",
            33901: "ALIASED_POINT_SIZE_RANGE",
            33902: "ALIASED_LINE_WIDTH_RANGE",
            33984: "TEXTURE0",
            33985: "TEXTURE1",
            33986: "TEXTURE2",
            33987: "TEXTURE3",
            33988: "TEXTURE4",
            33989: "TEXTURE5",
            33990: "TEXTURE6",
            33991: "TEXTURE7",
            33992: "TEXTURE8",
            33993: "TEXTURE9",
            33994: "TEXTURE10",
            33995: "TEXTURE11",
            33996: "TEXTURE12",
            33997: "TEXTURE13",
            33998: "TEXTURE14",
            33999: "TEXTURE15",
            34e3: "TEXTURE16",
            34001: "TEXTURE17",
            34002: "TEXTURE18",
            34003: "TEXTURE19",
            34004: "TEXTURE20",
            34005: "TEXTURE21",
            34006: "TEXTURE22",
            34007: "TEXTURE23",
            34008: "TEXTURE24",
            34009: "TEXTURE25",
            34010: "TEXTURE26",
            34011: "TEXTURE27",
            34012: "TEXTURE28",
            34013: "TEXTURE29",
            34014: "TEXTURE30",
            34015: "TEXTURE31",
            34016: "ACTIVE_TEXTURE",
            34024: "MAX_RENDERBUFFER_SIZE",
            34041: "DEPTH_STENCIL",
            34055: "INCR_WRAP",
            34056: "DECR_WRAP",
            34067: "TEXTURE_CUBE_MAP",
            34068: "TEXTURE_BINDING_CUBE_MAP",
            34069: "TEXTURE_CUBE_MAP_POSITIVE_X",
            34070: "TEXTURE_CUBE_MAP_NEGATIVE_X",
            34071: "TEXTURE_CUBE_MAP_POSITIVE_Y",
            34072: "TEXTURE_CUBE_MAP_NEGATIVE_Y",
            34073: "TEXTURE_CUBE_MAP_POSITIVE_Z",
            34074: "TEXTURE_CUBE_MAP_NEGATIVE_Z",
            34076: "MAX_CUBE_MAP_TEXTURE_SIZE",
            34338: "VERTEX_ATTRIB_ARRAY_ENABLED",
            34339: "VERTEX_ATTRIB_ARRAY_SIZE",
            34340: "VERTEX_ATTRIB_ARRAY_STRIDE",
            34341: "VERTEX_ATTRIB_ARRAY_TYPE",
            34342: "CURRENT_VERTEX_ATTRIB",
            34373: "VERTEX_ATTRIB_ARRAY_POINTER",
            34466: "NUM_COMPRESSED_TEXTURE_FORMATS",
            34467: "COMPRESSED_TEXTURE_FORMATS",
            34660: "BUFFER_SIZE",
            34661: "BUFFER_USAGE",
            34816: "STENCIL_BACK_FUNC",
            34817: "STENCIL_BACK_FAIL",
            34818: "STENCIL_BACK_PASS_DEPTH_FAIL",
            34819: "STENCIL_BACK_PASS_DEPTH_PASS",
            34877: "BLEND_EQUATION_ALPHA",
            34921: "MAX_VERTEX_ATTRIBS",
            34922: "VERTEX_ATTRIB_ARRAY_NORMALIZED",
            34930: "MAX_TEXTURE_IMAGE_UNITS",
            34962: "ARRAY_BUFFER",
            34963: "ELEMENT_ARRAY_BUFFER",
            34964: "ARRAY_BUFFER_BINDING",
            34965: "ELEMENT_ARRAY_BUFFER_BINDING",
            34975: "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING",
            35040: "STREAM_DRAW",
            35044: "STATIC_DRAW",
            35048: "DYNAMIC_DRAW",
            35632: "FRAGMENT_SHADER",
            35633: "VERTEX_SHADER",
            35660: "MAX_VERTEX_TEXTURE_IMAGE_UNITS",
            35661: "MAX_COMBINED_TEXTURE_IMAGE_UNITS",
            35663: "SHADER_TYPE",
            35664: "FLOAT_VEC2",
            35665: "FLOAT_VEC3",
            35666: "FLOAT_VEC4",
            35667: "INT_VEC2",
            35668: "INT_VEC3",
            35669: "INT_VEC4",
            35670: "BOOL",
            35671: "BOOL_VEC2",
            35672: "BOOL_VEC3",
            35673: "BOOL_VEC4",
            35674: "FLOAT_MAT2",
            35675: "FLOAT_MAT3",
            35676: "FLOAT_MAT4",
            35678: "SAMPLER_2D",
            35680: "SAMPLER_CUBE",
            35712: "DELETE_STATUS",
            35713: "COMPILE_STATUS",
            35714: "LINK_STATUS",
            35715: "VALIDATE_STATUS",
            35716: "INFO_LOG_LENGTH",
            35717: "ATTACHED_SHADERS",
            35718: "ACTIVE_UNIFORMS",
            35719: "ACTIVE_UNIFORM_MAX_LENGTH",
            35720: "SHADER_SOURCE_LENGTH",
            35721: "ACTIVE_ATTRIBUTES",
            35722: "ACTIVE_ATTRIBUTE_MAX_LENGTH",
            35724: "SHADING_LANGUAGE_VERSION",
            35725: "CURRENT_PROGRAM",
            36003: "STENCIL_BACK_REF",
            36004: "STENCIL_BACK_VALUE_MASK",
            36005: "STENCIL_BACK_WRITEMASK",
            36006: "FRAMEBUFFER_BINDING",
            36007: "RENDERBUFFER_BINDING",
            36048: "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE",
            36049: "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME",
            36050: "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL",
            36051: "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE",
            36053: "FRAMEBUFFER_COMPLETE",
            36054: "FRAMEBUFFER_INCOMPLETE_ATTACHMENT",
            36055: "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT",
            36057: "FRAMEBUFFER_INCOMPLETE_DIMENSIONS",
            36061: "FRAMEBUFFER_UNSUPPORTED",
            36064: "COLOR_ATTACHMENT0",
            36096: "DEPTH_ATTACHMENT",
            36128: "STENCIL_ATTACHMENT",
            36160: "FRAMEBUFFER",
            36161: "RENDERBUFFER",
            36162: "RENDERBUFFER_WIDTH",
            36163: "RENDERBUFFER_HEIGHT",
            36164: "RENDERBUFFER_INTERNAL_FORMAT",
            36168: "STENCIL_INDEX8",
            36176: "RENDERBUFFER_RED_SIZE",
            36177: "RENDERBUFFER_GREEN_SIZE",
            36178: "RENDERBUFFER_BLUE_SIZE",
            36179: "RENDERBUFFER_ALPHA_SIZE",
            36180: "RENDERBUFFER_DEPTH_SIZE",
            36181: "RENDERBUFFER_STENCIL_SIZE",
            36194: "RGB565",
            36336: "LOW_FLOAT",
            36337: "MEDIUM_FLOAT",
            36338: "HIGH_FLOAT",
            36339: "LOW_INT",
            36340: "MEDIUM_INT",
            36341: "HIGH_INT",
            36346: "SHADER_COMPILER",
            36347: "MAX_VERTEX_UNIFORM_VECTORS",
            36348: "MAX_VARYING_VECTORS",
            36349: "MAX_FRAGMENT_UNIFORM_VECTORS",
            37440: "UNPACK_FLIP_Y_WEBGL",
            37441: "UNPACK_PREMULTIPLY_ALPHA_WEBGL",
            37442: "CONTEXT_LOST_WEBGL",
            37443: "UNPACK_COLORSPACE_CONVERSION_WEBGL",
            37444: "BROWSER_DEFAULT_WEBGL"
        }
    }, {}],
    22: [function(e, t, r) {
        var n = e("./1.0/numbers");
        t.exports = function(e) {
            return n[e]
        }
    }, {
        "./1.0/numbers": 21
    }],
    23: [function(e, t, r) {
        "use strict";
        var a = e("gl-texture2d");
        t.exports = function(e, t, r, n) {
            c || (c = e.FRAMEBUFFER_UNSUPPORTED, u = e.FRAMEBUFFER_INCOMPLETE_ATTACHMENT, l = e.FRAMEBUFFER_INCOMPLETE_DIMENSIONS, h = e.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT);
            var i = e.getExtension("WEBGL_draw_buffers");
            !g && i && function(e, t) {
                var r = e.getParameter(t.MAX_COLOR_ATTACHMENTS_WEBGL);
                g = new Array(r + 1);
                for (var n = 0; n <= r; ++n) {
                    for (var i = new Array(r), o = 0; o < n; ++o) i[o] = e.COLOR_ATTACHMENT0 + o;
                    for (o = n; o < r; ++o) i[o] = e.NONE;
                    g[n] = i
                }
            }(e, i);
            Array.isArray(t) && (n = r, r = 0 | t[1], t = 0 | t[0]);
            if ("number" != typeof t) throw new Error("gl-fbo: Missing shape parameter");
            var o = e.getParameter(e.MAX_RENDERBUFFER_SIZE);
            if (t < 0 || o < t || r < 0 || o < r) throw new Error("gl-fbo: Parameters are too large for FBO");
            var a = 1;
            if ("color" in (n = n || {})) {
                if ((a = Math.max(0 | n.color, 0)) < 0) throw new Error("gl-fbo: Must specify a nonnegative number of colors");
                if (1 < a) {
                    if (!i) throw new Error("gl-fbo: Multiple draw buffer extension not supported");
                    if (a > e.getParameter(i.MAX_COLOR_ATTACHMENTS_WEBGL)) throw new Error("gl-fbo: Context does not support " + a + " draw buffers")
                }
            }
            var s = e.UNSIGNED_BYTE,
                f = e.getExtension("OES_texture_float");
            if (n.float && 0 < a) {
                if (!f) throw new Error("gl-fbo: Context does not support floating point textures");
                s = e.FLOAT
            } else n.preferFloat && 0 < a && f && (s = e.FLOAT);
            o = !0;
            "depth" in n && (o = !!n.depth);
            f = !1;
            "stencil" in n && (f = !!n.stencil);
            return new x(e, t, r, s, a, o, f, i)
        };
        var c, u, l, h, g = null;

        function p(e) {
            return [e.getParameter(e.FRAMEBUFFER_BINDING), e.getParameter(e.RENDERBUFFER_BINDING), e.getParameter(e.TEXTURE_BINDING_2D)]
        }

        function v(e, t) {
            e.bindFramebuffer(e.FRAMEBUFFER, t[0]), e.bindRenderbuffer(e.RENDERBUFFER, t[1]), e.bindTexture(e.TEXTURE_2D, t[2])
        }

        function d(e) {
            switch (e) {
                case c:
                    throw new Error("gl-fbo: Framebuffer unsupported");
                case u:
                    throw new Error("gl-fbo: Framebuffer incomplete attachment");
                case l:
                    throw new Error("gl-fbo: Framebuffer incomplete dimensions");
                case h:
                    throw new Error("gl-fbo: Framebuffer incomplete missing attachment");
                default:
                    throw new Error("gl-fbo: Framebuffer failed for unspecified reason")
            }
        }

        function y(e, t, r, n, i, o) {
            if (!n) return null;
            n = a(e, t, r, i, n);
            return n.magFilter = e.NEAREST, n.minFilter = e.NEAREST, n.mipSamples = 1, n.bind(), e.framebufferTexture2D(e.FRAMEBUFFER, o, e.TEXTURE_2D, n.handle, 0), n
        }

        function _(e, t, r, n, i) {
            var o = e.createRenderbuffer();
            return e.bindRenderbuffer(e.RENDERBUFFER, o), e.renderbufferStorage(e.RENDERBUFFER, n, t, r), e.framebufferRenderbuffer(e.FRAMEBUFFER, i, e.RENDERBUFFER, o), o
        }

        function x(e, t, r, n, i, o, a, s) {
            this.gl = e, this._shape = [0 | t, 0 | r], this._destroyed = !1, this._ext = s, this.color = new Array(i);
            for (var f = 0; f < i; ++f) this.color[f] = null;
            this._color_rb = null, this.depth = null, this._depth_rb = null, this._colorType = n, this._useDepth = o, this._useStencil = a;
            var c = this,
                r = [0 | t, 0 | r];
            Object.defineProperties(r, {
                    0: {
                        get: function() {
                            return c._shape[0]
                        },
                        set: function(e) {
                            return c.width = e
                        }
                    },
                    1: {
                        get: function() {
                            return c._shape[1]
                        },
                        set: function(e) {
                            return c.height = e
                        }
                    }
                }), this._shapeVector = r,
                function(e) {
                    var t = p(e.gl),
                        r = e.gl,
                        n = e.handle = r.createFramebuffer(),
                        i = e._shape[0],
                        o = e._shape[1],
                        a = e.color.length,
                        s = e._ext,
                        f = e._useStencil,
                        c = e._useDepth,
                        u = e._colorType;
                    r.bindFramebuffer(r.FRAMEBUFFER, n);
                    for (var l = 0; l < a; ++l) e.color[l] = y(r, i, o, u, r.RGBA, r.COLOR_ATTACHMENT0 + l);
                    if (0 === a ? (e._color_rb = _(r, i, o, r.RGBA4, r.COLOR_ATTACHMENT0), s && s.drawBuffersWEBGL(g[0])) : 1 < a && s.drawBuffersWEBGL(g[a]), (s = r.getExtension("WEBGL_depth_texture")) ? f ? e.depth = y(r, i, o, s.UNSIGNED_INT_24_8_WEBGL, r.DEPTH_STENCIL, r.DEPTH_STENCIL_ATTACHMENT) : c && (e.depth = y(r, i, o, r.UNSIGNED_SHORT, r.DEPTH_COMPONENT, r.DEPTH_ATTACHMENT)) : c && f ? e._depth_rb = _(r, i, o, r.DEPTH_STENCIL, r.DEPTH_STENCIL_ATTACHMENT) : c ? e._depth_rb = _(r, i, o, r.DEPTH_COMPONENT16, r.DEPTH_ATTACHMENT) : f && (e._depth_rb = _(r, i, o, r.STENCIL_INDEX, r.STENCIL_ATTACHMENT)), (f = r.checkFramebufferStatus(r.FRAMEBUFFER)) !== r.FRAMEBUFFER_COMPLETE) {
                        e._destroyed = !0, r.bindFramebuffer(r.FRAMEBUFFER, null), r.deleteFramebuffer(e.handle), e.handle = null, e.depth && (e.depth.dispose(), e.depth = null), e._depth_rb && (r.deleteRenderbuffer(e._depth_rb), e._depth_rb = null);
                        for (l = 0; l < e.color.length; ++l) e.color[l].dispose(), e.color[l] = null;
                        e._color_rb && (r.deleteRenderbuffer(e._color_rb), e._color_rb = null), v(r, t), d(f)
                    }
                    v(r, t)
                }(this)
        }
        t = x.prototype;

        function n(e, t, r) {
            if (e._destroyed) throw new Error("gl-fbo: Can't resize destroyed FBO");
            if (e._shape[0] !== t || e._shape[1] !== r) {
                var n = e.gl,
                    i = n.getParameter(n.MAX_RENDERBUFFER_SIZE);
                if (t < 0 || i < t || r < 0 || i < r) throw new Error("gl-fbo: Can't resize FBO, invalid dimensions");
                e._shape[0] = t, e._shape[1] = r;
                for (var t = p(n), o = 0; o < e.color.length; ++o) e.color[o].shape = e._shape;
                e._color_rb && (n.bindRenderbuffer(n.RENDERBUFFER, e._color_rb), n.renderbufferStorage(n.RENDERBUFFER, n.RGBA4, e._shape[0], e._shape[1])), e.depth && (e.depth.shape = e._shape), e._depth_rb && (n.bindRenderbuffer(n.RENDERBUFFER, e._depth_rb), e._useDepth && e._useStencil ? n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_STENCIL, e._shape[0], e._shape[1]) : e._useDepth ? n.renderbufferStorage(n.RENDERBUFFER, n.DEPTH_COMPONENT16, e._shape[0], e._shape[1]) : e._useStencil && n.renderbufferStorage(n.RENDERBUFFER, n.STENCIL_INDEX, e._shape[0], e._shape[1])), n.bindFramebuffer(n.FRAMEBUFFER, e.handle);
                r = n.checkFramebufferStatus(n.FRAMEBUFFER);
                r !== n.FRAMEBUFFER_COMPLETE && (e.dispose(), v(n, t), d(r)), v(n, t)
            }
        }
        Object.defineProperties(t, {
            shape: {
                get: function() {
                    return this._destroyed ? [0, 0] : this._shapeVector
                },
                set: function(e) {
                    if (2 !== (e = !Array.isArray(e) ? [0 | e, 0 | e] : e).length) throw new Error("gl-fbo: Shape vector must be length 2");
                    var t = 0 | e[0],
                        e = 0 | e[1];
                    return n(this, t, e), [t, e]
                },
                enumerable: !1
            },
            width: {
                get: function() {
                    return this._destroyed ? 0 : this._shape[0]
                },
                set: function(e) {
                    return n(this, e |= 0, this._shape[1]), e
                },
                enumerable: !1
            },
            height: {
                get: function() {
                    return this._destroyed ? 0 : this._shape[1]
                },
                set: function(e) {
                    return n(this, this._shape[0], e |= 0), e
                },
                enumerable: !1
            }
        }), t.bind = function() {
            var e;
            this._destroyed || ((e = this.gl).bindFramebuffer(e.FRAMEBUFFER, this.handle), e.viewport(0, 0, this._shape[0], this._shape[1]))
        }, t.dispose = function() {
            if (!this._destroyed) {
                this._destroyed = !0;
                var e = this.gl;
                e.deleteFramebuffer(this.handle), this.handle = null, this.depth && (this.depth.dispose(), this.depth = null), this._depth_rb && (e.deleteRenderbuffer(this._depth_rb), this._depth_rb = null);
                for (var t = 0; t < this.color.length; ++t) this.color[t].dispose(), this.color[t] = null;
                this._color_rb && (e.deleteRenderbuffer(this._color_rb), this._color_rb = null)
            }
        }
    }, {
        "gl-texture2d": 34
    }],
    24: [function(e, t, r) {
        var g = e("sprintf-js").sprintf,
            p = e("gl-constants/lookup"),
            v = e("glsl-shader-name"),
            d = e("add-line-numbers");
        t.exports = function(e, t, r) {
            "use strict";
            var n = v(t) || "of unknown name (see npm glsl-shader-name)",
                i = "unknown type";
            void 0 !== r && (i = r === p.FRAGMENT_SHADER ? "fragment" : "vertex");
            for (var o = g("Error compiling %s shader %s:\n", i, n), n = g("%s%s", o, e), a = e.split("\n"), s = {}, f = 0; f < a.length; f++) {
                var c = a[f];
                if ("" !== c && "\0" !== c) {
                    var u = parseInt(c.split(":")[2]);
                    if (isNaN(u)) throw new Error(g("Could not parse error: %s", c));
                    s[u] = c
                }
            }
            for (var l = d(t).split("\n"), f = 0; f < l.length; f++) {
                var h;
                (s[f + 3] || s[f + 2] || s[f + 1]) && (h = l[f], o += h + "\n", s[f + 1] && (h = (h = s[f + 1]).substr(h.split(":", 3).join(":").length + 1).trim(), o += g("^^^ %s\n\n", h)))
            }
            return {
                long: o.trim(),
                short: n.trim()
            }
        }
    }, {
        "add-line-numbers": 6,
        "gl-constants/lookup": 22,
        "glsl-shader-name": 39,
        "sprintf-js": 63
    }],
    25: [function(e, t, r) {
        var n = e("./state");
        t.exports = function(i) {
            var e = ["Buffer", "Framebuffer", "Renderbuffer", "Program", "Shader", "Texture"].map(function(e) {
                var t = "delete" + e,
                    e = "create" + e,
                    r = i[e],
                    n = [];
                return i[e] = function() {
                    var e = r.apply(this, arguments);
                    return n.push(e), e
                }, {
                    remove: t,
                    handles: n
                }
            });
            return function() {
                return e.forEach(function(e) {
                    for (var t = 0; t < e.handles.length; t++) i[e.remove].call(i, e.handles[t])
                }), n(i), i
            }
        }, t.exports.state = n
    }, {
        "./state": 26
    }],
    26: [function(e, t, r) {
        t.exports = function(e) {
            var t = e.getParameter(e.MAX_VERTEX_ATTRIBS),
                r = e.createBuffer();
            e.bindBuffer(e.ARRAY_BUFFER, r);
            for (var n = 0; n < t; ++n) e.disableVertexAttribArray(n), e.vertexAttribPointer(n, 4, e.FLOAT, !1, 0, 0), e.vertexAttrib1f(n, 0);
            e.deleteBuffer(r);
            for (var i = e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS), n = 0; n < i; ++n) e.activeTexture(e.TEXTURE0 + n), e.bindTexture(e.TEXTURE_CUBE_MAP, null), e.bindTexture(e.TEXTURE_2D, null);
            return e.activeTexture(e.TEXTURE0), e.useProgram(null), e.bindBuffer(e.ARRAY_BUFFER, null), e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, null), e.bindFramebuffer(e.FRAMEBUFFER, null), e.bindRenderbuffer(e.RENDERBUFFER, null), e.disable(e.BLEND), e.disable(e.CULL_FACE), e.disable(e.DEPTH_TEST), e.disable(e.DITHER), e.disable(e.SCISSOR_TEST), e.blendColor(0, 0, 0, 0), e.blendEquation(e.FUNC_ADD), e.blendFunc(e.ONE, e.ZERO), e.clearColor(0, 0, 0, 0), e.clearDepth(1), e.clearStencil(-1), e.colorMask(!0, !0, !0, !0), e.cullFace(e.BACK), e.depthFunc(e.LESS), e.depthMask(!0), e.depthRange(0, 1), e.frontFace(e.CCW), e.hint(e.GENERATE_MIPMAP_HINT, e.DONT_CARE), e.lineWidth(1), e.pixelStorei(e.PACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_ALIGNMENT, 4), e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1), e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1), e.polygonOffset(0, 0), e.sampleCoverage(1, !1), e.scissor(0, 0, e.canvas.width, e.canvas.height), e.stencilFunc(e.ALWAYS, 0, 4294967295), e.stencilMask(4294967295), e.stencilOp(e.KEEP, e.KEEP, e.KEEP), e.viewport(0, 0, e.canvas.width, e.canvas.height), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT | e.STENCIL_BUFFER_BIT), e
        }
    }, {}],
    27: [function(e, t, r) {
        "use strict";
        var _ = e("./lib/create-uniforms"),
            x = e("./lib/create-attributes"),
            m = e("./lib/reflect"),
            E = e("./lib/shader-cache"),
            b = e("./lib/runtime-reflect"),
            w = e("./lib/GLError");

        function o(e) {
            this.gl = e, this.gl.lastAttribCount = 0, this._vref = this._fref = this._relink = this.vertShader = this.fragShader = this.program = this.attributes = this.uniforms = this.types = null
        }
        e = o.prototype;

        function A(e, t) {
            return e.name < t.name ? -1 : 1
        }
        e.bind = function() {
            var e;
            this.program || this._relink();
            var t = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES),
                r = this.gl.lastAttribCount;
            if (r < t)
                for (e = r; e < t; e++) this.gl.enableVertexAttribArray(e);
            else if (t < r)
                for (e = t; e < r; e++) this.gl.disableVertexAttribArray(e);
            this.gl.lastAttribCount = t, this.gl.useProgram(this.program)
        }, e.dispose = function() {
            for (var e = this.gl.lastAttribCount, t = 0; t < e; t++) this.gl.disableVertexAttribArray(t);
            this.gl.lastAttribCount = 0, this._fref && this._fref.dispose(), this._vref && this._vref.dispose(), this.attributes = this.types = this.vertShader = this.fragShader = this.program = this._relink = this._fref = this._vref = null
        }, e.update = function(e, t, r, n) {
            t && 1 !== arguments.length || (e = (a = e).vertex, t = a.fragment, r = a.uniforms, n = a.attributes);
            var i = this,
                o = i.gl,
                a = i._vref;
            i._vref = E.shader(o, o.VERTEX_SHADER, e), a && a.dispose(), i.vertShader = i._vref.shader;
            a = this._fref;
            if (i._fref = E.shader(o, o.FRAGMENT_SHADER, t), a && a.dispose(), i.fragShader = i._fref.shader, !r || !n) {
                t = o.createProgram();
                if (o.attachShader(t, i.fragShader), o.attachShader(t, i.vertShader), o.linkProgram(t), !o.getProgramParameter(t, o.LINK_STATUS)) {
                    a = o.getProgramInfoLog(t);
                    throw new w(a, "Error linking program:" + a)
                }
                r = r || b.uniforms(o, t), n = n || b.attributes(o, t), o.deleteProgram(t)
            }(n = n.slice()).sort(A);
            for (var s = [], f = [], c = [], u = 0; u < n.length; ++u) {
                var l = n[u];
                if (0 <= l.type.indexOf("mat")) {
                    for (var h = 0 | l.type.charAt(l.type.length - 1), g = new Array(h), p = 0; p < h; ++p) g[p] = c.length, f.push(l.name + "[" + p + "]"), "number" == typeof l.location ? c.push(l.location + p) : Array.isArray(l.location) && l.location.length === h && "number" == typeof l.location[p] ? c.push(0 | l.location[p]) : c.push(-1);
                    s.push({
                        name: l.name,
                        type: l.type,
                        locations: g
                    })
                } else s.push({
                    name: l.name,
                    type: l.type,
                    locations: [c.length]
                }), f.push(l.name), "number" == typeof l.location ? c.push(0 | l.location) : c.push(-1)
            }
            var v = 0;
            for (u = 0; u < c.length; ++u)
                if (c[u] < 0) {
                    for (; 0 <= c.indexOf(v);) v += 1;
                    c[u] = v
                } var d = new Array(r.length);

            function y() {
                i.program = E.program(o, i._vref, i._fref, f, c);
                for (var e = 0; e < r.length; ++e) d[e] = o.getUniformLocation(i.program, r[e].name)
            }
            y(), i._relink = y, i.types = {
                uniforms: m(r),
                attributes: m(n)
            }, i.attributes = x(o, i, s, c), Object.defineProperty(i, "uniforms", _(o, i, r, d))
        }, t.exports = function(e, t, r, n, i) {
            return (e = new o(e)).update(t, r, n, i), e
        }
    }, {
        "./lib/GLError": 28,
        "./lib/create-attributes": 29,
        "./lib/create-uniforms": 30,
        "./lib/reflect": 31,
        "./lib/runtime-reflect": 32,
        "./lib/shader-cache": 33
    }],
    28: [function(e, t, r) {
        function n(e, t, r) {
            this.shortMessage = t || "", this.longMessage = r || "", this.rawError = e || "", this.message = "gl-shader: " + (t || e || "") + (r ? "\n" + r : ""), this.stack = (new Error).stack
        }(n.prototype = new Error).name = "GLError", t.exports = n.prototype.constructor = n
    }, {}],
    29: [function(e, t, r) {
        "use strict";
        t.exports = function(e, t, r, n) {
            for (var i = {}, o = 0, a = r.length; o < a; ++o) {
                var s, f = r[o],
                    c = f.name,
                    u = f.type,
                    l = f.locations;
                switch (u) {
                    case "bool":
                    case "int":
                    case "float":
                        g(e, t, l[0], n, 1, i, c);
                        break;
                    default:
                        if (0 <= u.indexOf("vec")) {
                            if ((s = u.charCodeAt(u.length - 1) - 48) < 2 || 4 < s) throw new h("", "Invalid data type for attribute " + c + ": " + u);
                            g(e, t, l[0], n, s, i, c)
                        } else {
                            if (!(0 <= u.indexOf("mat"))) throw new h("", "Unknown data type for attribute " + c + ": " + u);
                            if ((s = u.charCodeAt(u.length - 1) - 48) < 2 || 4 < s) throw new h("", "Invalid data type for attribute " + c + ": " + u);
                            ! function(a, e, s, f, c, t, r) {
                                for (var n = new Array(c), i = new Array(c), o = 0; o < c; ++o) g(a, e, s[o], f, c, n, o), i[o] = n[o];
                                Object.defineProperty(n, "location", {
                                    set: function(e) {
                                        if (Array.isArray(e))
                                            for (var t = 0; t < c; ++t) i[t].location = e[t];
                                        else
                                            for (t = 0; t < c; ++t) i[t].location = e + t;
                                        return e
                                    },
                                    get: function() {
                                        for (var e = new Array(c), t = 0; t < c; ++t) e[t] = f[s[t]];
                                        return e
                                    },
                                    enumerable: !0
                                }), n.pointer = function(e, t, r, n) {
                                    e = e || a.FLOAT, t = !!t, r = r || c * c, n = n || 0;
                                    for (var i = 0; i < c; ++i) {
                                        var o = f[s[i]];
                                        a.vertexAttribPointer(o, c, e, t, r, n + i * c), a.enableVertexAttribArray(o)
                                    }
                                };
                                var u = new Array(c),
                                    l = a["vertexAttrib" + c + "fv"];
                                Object.defineProperty(t, r, {
                                    set: function(e) {
                                        for (var t = 0; t < c; ++t) {
                                            var r = f[s[t]];
                                            if (a.disableVertexAttribArray(r), Array.isArray(e[0])) l.call(a, r, e[t]);
                                            else {
                                                for (var n = 0; n < c; ++n) u[n] = e[c * t + n];
                                                l.call(a, r, u)
                                            }
                                        }
                                        return e
                                    },
                                    get: function() {
                                        return n
                                    },
                                    enumerable: !0
                                })
                            }(e, t, l, n, s, i, c)
                        }
                }
            }
            return i
        };
        var h = e("./GLError");

        function c(e, t, r, n, i, o) {
            this._gl = e, this._wrapper = t, this._index = r, this._locations = n, this._dimension = i, this._constFunc = o
        }
        e = c.prototype;
        e.pointer = function(e, t, r, n) {
            var i = this._gl,
                o = this._locations[this._index];
            i.vertexAttribPointer(o, this._dimension, e || i.FLOAT, !!t, r || 0, n || 0), i.enableVertexAttribArray(o)
        }, e.set = function(e, t, r, n) {
            return this._constFunc(this._locations[this._index], e, t, r, n)
        }, Object.defineProperty(e, "location", {
            get: function() {
                return this._locations[this._index]
            },
            set: function(e) {
                return e !== this._locations[this._index] && (this._locations[this._index] = 0 | e, this._wrapper.program = null), 0 | e
            }
        });
        var u = [function(e, t, r) {
            return void 0 === r.length ? e.vertexAttrib1f(t, r) : e.vertexAttrib1fv(t, r)
        }, function(e, t, r, n) {
            return void 0 === r.length ? e.vertexAttrib2f(t, r, n) : e.vertexAttrib2fv(t, r)
        }, function(e, t, r, n, i) {
            return void 0 === r.length ? e.vertexAttrib3f(t, r, n, i) : e.vertexAttrib3fv(t, r)
        }, function(e, t, r, n, i, o) {
            return void 0 === r.length ? e.vertexAttrib4f(t, r, n, i, o) : e.vertexAttrib4fv(t, r)
        }];

        function g(t, e, r, n, i, o, a) {
            var s = u[i],
                f = new c(t, e, r, n, i, s);
            Object.defineProperty(o, a, {
                set: function(e) {
                    return t.disableVertexAttribArray(n[r]), s(t, n[r], e), e
                },
                get: function() {
                    return f
                },
                enumerable: !0
            })
        }
    }, {
        "./GLError": 28
    }],
    30: [function(e, t, r) {
        "use strict";
        var n = e("./reflect"),
            v = e("./GLError");

        function s(e) {
            return function() {
                return e
            }
        }

        function f(e, t) {
            for (var r = new Array(e), n = 0; n < e; ++n) r[n] = t;
            return r
        }
        t.exports = function(h, e, g, p) {
            function o(l) {
                return function(e) {
                    for (var t = function e(t, r) {
                            if ("object" != typeof r) return [
                                [t, r]
                            ];
                            var n = [];
                            for (var i in r) {
                                var o = r[i],
                                    a = t;
                                parseInt(i) + "" === i ? a += "[" + i + "]" : a += "." + i, "object" == typeof o ? n.push.apply(n, e(a, o)) : n.push([a, o])
                            }
                            return n
                        }("", l), r = 0; r < t.length; ++r) {
                        var n = t[r],
                            i = n[0],
                            o = n[1];
                        if (p[o]) {
                            var a, s = e;
                            "string" != typeof i || 0 !== i.indexOf(".") && 0 !== i.indexOf("[") || (s = (a = 0 === (a = i).indexOf(".") ? i.slice(1) : a).indexOf("]") === a.length - 1 ? (n = a.indexOf("["), i = a.slice(0, n), n = a.slice(n + 1, a.length - 1), (i ? e[i] : e)[n]) : e[a]);
                            var f, c = g[o].type;
                            switch (c) {
                                case "bool":
                                case "int":
                                case "sampler2D":
                                case "samplerCube":
                                    h.uniform1i(p[o], s);
                                    break;
                                case "float":
                                    h.uniform1f(p[o], s);
                                    break;
                                default:
                                    var u = c.indexOf("vec");
                                    if (!(0 <= u && u <= 1 && c.length === 4 + u)) {
                                        if (0 !== c.indexOf("mat") || 4 !== c.length) throw new v("", "Unknown uniform data type for " + name + ": " + c);
                                        if ((f = c.charCodeAt(c.length - 1) - 48) < 2 || 4 < f) throw new v("", "Invalid uniform dimension type for matrix " + name + ": " + c);
                                        h["uniformMatrix" + f + "fv"](p[o], !1, s);
                                        break
                                    }
                                    if ((f = c.charCodeAt(c.length - 1) - 48) < 2 || 4 < f) throw new v("", "Invalid data type");
                                    switch (c.charAt(0)) {
                                        case "b":
                                        case "i":
                                            h["uniform" + f + "iv"](p[o], s);
                                            break;
                                        case "v":
                                            h["uniform" + f + "fv"](p[o], s);
                                            break;
                                        default:
                                            throw new v("", "Unrecognized data type for vector " + name + ": " + c)
                                    }
                            }
                        }
                    }
                }
            }

            function i(e, t, r) {
                var n, i;
                "object" == typeof r ? (n = a(r), Object.defineProperty(e, t, {
                    get: s(n),
                    set: o(r),
                    enumerable: !0,
                    configurable: !1
                })) : p[r] ? Object.defineProperty(e, t, {
                    get: function(e, t, r) {
                        return e.getUniform(t.program, r[i])
                    },
                    set: o(i = r),
                    enumerable: !0,
                    configurable: !1
                }) : e[t] = function(e) {
                    switch (e) {
                        case "bool":
                            return !1;
                        case "int":
                        case "sampler2D":
                        case "samplerCube":
                        case "float":
                            return 0;
                        default:
                            var t, r = e.indexOf("vec");
                            if (0 <= r && r <= 1 && e.length === 4 + r) {
                                if ((t = e.charCodeAt(e.length - 1) - 48) < 2 || 4 < t) throw new v("", "Invalid data type");
                                return "b" === e.charAt(0) ? f(t, !1) : f(t, 0)
                            }
                            if (0 !== e.indexOf("mat") || 4 !== e.length) throw new v("", "Unknown uniform data type for " + name + ": " + e);
                            if ((t = e.charCodeAt(e.length - 1) - 48) < 2 || 4 < t) throw new v("", "Invalid uniform dimension type for matrix " + name + ": " + e);
                            return f(t * t, 0)
                    }
                }(g[r].type)
            }

            function a(e) {
                if (Array.isArray(e))
                    for (var t = new Array(e.length), r = 0; r < e.length; ++r) i(t, r, e[r]);
                else
                    for (var n in t = {}, e) i(t, n, e[n]);
                return t
            }
            var t = n(g, !0);
            return {
                get: s(a(t)),
                set: o(t),
                enumerable: !0,
                configurable: !0
            }
        }
    }, {
        "./GLError": 28,
        "./reflect": 31
    }],
    31: [function(e, t, r) {
        "use strict";
        t.exports = function(e, t) {
            for (var r = {}, n = 0; n < e.length; ++n)
                for (var i = e[n].name.split("."), o = r, a = 0; a < i.length; ++a) {
                    var s = i[a].split("[");
                    if (1 < s.length) {
                        s[0] in o || (o[s[0]] = []), o = o[s[0]];
                        for (var f = 1; f < s.length; ++f) {
                            var c = parseInt(s[f]);
                            f < s.length - 1 || a < i.length - 1 ? (c in o || (f < s.length - 1 ? o[c] = [] : o[c] = {}), o = o[c]) : o[c] = t ? n : e[n].type
                        }
                    } else a < i.length - 1 ? (s[0] in o || (o[s[0]] = {}), o = o[s[0]]) : o[s[0]] = t ? n : e[n].type
                }
            return r
        }
    }, {}],
    32: [function(e, t, r) {
        "use strict";
        r.uniforms = function(e, t) {
            for (var r = e.getProgramParameter(t, e.ACTIVE_UNIFORMS), n = [], i = 0; i < r; ++i) {
                var o = e.getActiveUniform(t, i);
                if (o) {
                    var a = f(e, o.type);
                    if (1 < o.size)
                        for (var s = 0; s < o.size; ++s) n.push({
                            name: o.name.replace("[0]", "[" + s + "]"),
                            type: a
                        });
                    else n.push({
                        name: o.name,
                        type: a
                    })
                }
            }
            return n
        }, r.attributes = function(e, t) {
            for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), n = [], i = 0; i < r; ++i) {
                var o = e.getActiveAttrib(t, i);
                o && n.push({
                    name: o.name,
                    type: f(e, o.type)
                })
            }
            return n
        };
        var o = {
                FLOAT: "float",
                FLOAT_VEC2: "vec2",
                FLOAT_VEC3: "vec3",
                FLOAT_VEC4: "vec4",
                INT: "int",
                INT_VEC2: "ivec2",
                INT_VEC3: "ivec3",
                INT_VEC4: "ivec4",
                BOOL: "bool",
                BOOL_VEC2: "bvec2",
                BOOL_VEC3: "bvec3",
                BOOL_VEC4: "bvec4",
                FLOAT_MAT2: "mat2",
                FLOAT_MAT3: "mat3",
                FLOAT_MAT4: "mat4",
                SAMPLER_2D: "sampler2D",
                SAMPLER_CUBE: "samplerCube"
            },
            a = null;

        function f(e, t) {
            if (!a) {
                var r = Object.keys(o);
                a = {};
                for (var n = 0; n < r.length; ++n) {
                    var i = r[n];
                    a[e[i]] = o[i]
                }
            }
            return a[t]
        }
    }, {}],
    33: [function(e, t, r) {
        "use strict";
        r.shader = function(e, t, r) {
            return c(e).getShaderReference(t, r)
        }, r.program = function(e, t, r, n, i) {
            return c(e).getProgram(t, r, n, i)
        };
        var s = e("./GLError"),
            o = e("gl-format-compiler-error"),
            n = new("undefined" == typeof WeakMap ? e("weakmap-shim") : WeakMap),
            a = 0;

        function f(e, t, r, n, i, o, a) {
            this.id = e, this.src = t, this.type = r, this.shader = n, this.count = o, this.programs = [], this.cache = a
        }

        function i(e) {
            this.gl = e, this.shaders = [{}, {}], this.programs = {}
        }
        f.prototype.dispose = function() {
            if (0 == --this.count) {
                for (var e = this.cache, t = e.gl, r = this.programs, n = 0, i = r.length; n < i; ++n) {
                    var o = e.programs[r[n]];
                    o && (delete e.programs[n], t.deleteProgram(o))
                }
                t.deleteShader(this.shader), delete e.shaders[this.type === t.FRAGMENT_SHADER | 0][this.src]
            }
        };
        e = i.prototype;

        function c(e) {
            var t = n.get(e);
            return t || (t = new i(e), n.set(e, t)), t
        }
        e.getShaderReference = function(e, t) {
            var r = this.gl,
                n = this.shaders[e === r.FRAGMENT_SHADER | 0],
                i = n[t];
            return i && r.isShader(i.shader) ? i.count += 1 : (r = function(e, t, r) {
                var n = e.createShader(t);
                if (e.shaderSource(n, r), e.compileShader(n), e.getShaderParameter(n, e.COMPILE_STATUS)) return n;
                n = e.getShaderInfoLog(n);
                try {
                    var i = o(n, r, t)
                } catch (e) {
                    throw console.warn("Failed to format compiler error: " + e), new s(n, "Error compiling shader:\n" + n)
                }
                throw new s(n, i.short, i.long)
            }(r, e, t), i = n[t] = new f(a++, t, e, r, 0, 1, this)), i
        }, e.getProgram = function(e, t, r, n) {
            var i = [e.id, t.id, r.join(":"), n.join(":")].join("@"),
                o = this.programs[i];
            return o && this.gl.isProgram(o) || (this.programs[i] = o = function(e, t, r, n, i) {
                var o = e.createProgram();
                e.attachShader(o, t), e.attachShader(o, r);
                for (var a = 0; a < n.length; ++a) e.bindAttribLocation(o, i[a], n[a]);
                if (e.linkProgram(o), e.getProgramParameter(o, e.LINK_STATUS)) return o;
                throw r = e.getProgramInfoLog(o), new s(r, "Error linking program: " + r)
            }(this.gl, e.shader, t.shader, r, n), e.programs.push(i), t.programs.push(i)), o
        }
    }, {
        "./GLError": 28,
        "gl-format-compiler-error": 24,
        "weakmap-shim": 69
    }],
    34: [function(e, t, r) {
        "use strict";
        var g = e("ndarray"),
            p = e("ndarray-ops"),
            v = e("typedarray-pool");
        t.exports = function(e) {
            if (arguments.length <= 1) throw new Error("gl-texture2d: Missing arguments for texture2d constructor");
            n || function(e) {
                n = [e.LINEAR, e.NEAREST_MIPMAP_LINEAR, e.LINEAR_MIPMAP_NEAREST, e.LINEAR_MIPMAP_NEAREST], i = [e.NEAREST, e.LINEAR, e.NEAREST_MIPMAP_NEAREST, e.NEAREST_MIPMAP_LINEAR, e.LINEAR_MIPMAP_NEAREST, e.LINEAR_MIPMAP_LINEAR], o = [e.REPEAT, e.CLAMP_TO_EDGE, e.MIRRORED_REPEAT]
            }(e);
            if ("number" == typeof arguments[1]) return f(e, arguments[1], arguments[2], arguments[3] || e.RGBA, arguments[4] || e.UNSIGNED_BYTE);
            if (Array.isArray(arguments[1])) return f(e, 0 | arguments[1][0], 0 | arguments[1][1], arguments[2] || e.RGBA, arguments[3] || e.UNSIGNED_BYTE);
            if ("object" == typeof arguments[1]) {
                var t = arguments[1],
                    r = a(t) ? t : t.raw;
                if (r) return function(e, t, r, n, i, o) {
                    var a = l(e);
                    return e.texImage2D(e.TEXTURE_2D, 0, i, i, o, t), new u(e, a, r, n, i, o)
                }(e, r, 0 | t.width, 0 | t.height, arguments[2] || e.RGBA, arguments[3] || e.UNSIGNED_BYTE);
                if (t.shape && t.data && t.stride) return function(e, t) {
                    var r = t.dtype,
                        n = t.shape.slice(),
                        i = e.getParameter(e.MAX_TEXTURE_SIZE);
                    if (n[0] < 0 || n[0] > i || n[1] < 0 || n[1] > i) throw new Error("gl-texture2d: Invalid texture size");
                    var o = y(n, t.stride.slice()),
                        a = 0;
                    "float32" === r ? a = e.FLOAT : "float64" === r ? (a = e.FLOAT, o = !1, r = "float32") : "uint8" === r ? a = e.UNSIGNED_BYTE : (a = e.UNSIGNED_BYTE, o = !1, r = "uint8");
                    var s, f = 0;
                    if (2 === n.length) f = e.LUMINANCE, n = [n[0], n[1], 1], t = g(t.data, n, [t.stride[0], t.stride[1], 1], t.offset);
                    else {
                        if (3 !== n.length) throw new Error("gl-texture2d: Invalid shape for texture");
                        if (1 === n[2]) f = e.ALPHA;
                        else if (2 === n[2]) f = e.LUMINANCE_ALPHA;
                        else if (3 === n[2]) f = e.RGB;
                        else {
                            if (4 !== n[2]) throw new Error("gl-texture2d: Invalid shape for pixel coords");
                            f = e.RGBA
                        }
                    }
                    a !== e.FLOAT || e.getExtension("OES_texture_float") || (a = e.UNSIGNED_BYTE, o = !1);
                    var c = t.size;
                    t = o ? 0 === t.offset && t.data.length === c ? t.data : t.data.subarray(t.offset, t.offset + c) : (i = [n[2], n[2] * n[0], 1], s = v.malloc(c, r), i = g(s, n, i, 0), "float32" !== r && "float64" !== r || a !== e.UNSIGNED_BYTE ? p.assign(i, t) : d(i, t), s.subarray(0, c));
                    c = l(e);
                    e.texImage2D(e.TEXTURE_2D, 0, f, n[0], n[1], 0, f, a, t), o || v.free(s);
                    return new u(e, c, n[0], n[1], f, a)
                }(e, t)
            }
            throw new Error("gl-texture2d: Invalid arguments for texture2d constructor")
        };
        var n = null,
            i = null,
            o = null;

        function a(e) {
            return "undefined" != typeof HTMLCanvasElement && e instanceof HTMLCanvasElement || "undefined" != typeof HTMLImageElement && e instanceof HTMLImageElement || "undefined" != typeof HTMLVideoElement && e instanceof HTMLVideoElement || "undefined" != typeof ImageData && e instanceof ImageData
        }
        var d = function(e, t) {
            p.muls(e, t, 255)
        };

        function s(e, t, r) {
            var n = e.gl,
                i = n.getParameter(n.MAX_TEXTURE_SIZE);
            if (t < 0 || i < t || r < 0 || i < r) throw new Error("gl-texture2d: Invalid texture size");
            return e._shape = [t, r], e.bind(), n.texImage2D(n.TEXTURE_2D, 0, e.format, t, r, 0, e.format, e.type, null), e._mipLevels = [0], e
        }

        function u(e, t, r, n, i, o) {
            this.gl = e, this.handle = t, this.format = i, this.type = o, this._shape = [r, n], this._mipLevels = [0], this._magFilter = e.NEAREST, this._minFilter = e.NEAREST, this._wrapS = e.CLAMP_TO_EDGE, this._wrapT = e.CLAMP_TO_EDGE, this._anisoSamples = 1;
            var a = this,
                e = [this._wrapS, this._wrapT];
            Object.defineProperties(e, [{
                get: function() {
                    return a._wrapS
                },
                set: function(e) {
                    return a.wrapS = e
                }
            }, {
                get: function() {
                    return a._wrapT
                },
                set: function(e) {
                    return a.wrapT = e
                }
            }]), this._wrapVector = e;
            e = [this._shape[0], this._shape[1]];
            Object.defineProperties(e, [{
                get: function() {
                    return a._shape[0]
                },
                set: function(e) {
                    return a.width = e
                }
            }, {
                get: function() {
                    return a._shape[1]
                },
                set: function(e) {
                    return a.height = e
                }
            }]), this._shapeVector = e
        }
        t = u.prototype;

        function y(e, t) {
            return 3 === e.length ? 1 === t[2] && t[1] === e[0] * e[2] && t[0] === e[2] : 1 === t[0] && t[1] === e[0]
        }

        function l(e) {
            var t = e.createTexture();
            return e.bindTexture(e.TEXTURE_2D, t), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.NEAREST), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE), e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE), t
        }

        function f(e, t, r, n, i) {
            var o = e.getParameter(e.MAX_TEXTURE_SIZE);
            if (t < 0 || o < t || r < 0 || o < r) throw new Error("gl-texture2d: Invalid texture shape");
            if (i === e.FLOAT && !e.getExtension("OES_texture_float")) throw new Error("gl-texture2d: Floating point textures not supported on this platform");
            o = l(e);
            return e.texImage2D(e.TEXTURE_2D, 0, n, t, r, 0, n, i, null), new u(e, o, t, r, n, i)
        }
        Object.defineProperties(t, {
            minFilter: {
                get: function() {
                    return this._minFilter
                },
                set: function(e) {
                    this.bind();
                    var t = this.gl;
                    if (this.type === t.FLOAT && 0 <= n.indexOf(e) && (t.getExtension("OES_texture_float_linear") || (e = t.NEAREST)), i.indexOf(e) < 0) throw new Error("gl-texture2d: Unknown filter mode " + e);
                    return t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, e), this._minFilter = e
                }
            },
            magFilter: {
                get: function() {
                    return this._magFilter
                },
                set: function(e) {
                    this.bind();
                    var t = this.gl;
                    if (this.type === t.FLOAT && 0 <= n.indexOf(e) && (t.getExtension("OES_texture_float_linear") || (e = t.NEAREST)), i.indexOf(e) < 0) throw new Error("gl-texture2d: Unknown filter mode " + e);
                    return t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, e), this._magFilter = e
                }
            },
            mipSamples: {
                get: function() {
                    return this._anisoSamples
                },
                set: function(e) {
                    var t = this._anisoSamples;
                    return this._anisoSamples = 0 | Math.max(e, 1), t === this._anisoSamples || (t = this.gl.getExtension("EXT_texture_filter_anisotropic")) && this.gl.texParameterf(this.gl.TEXTURE_2D, t.TEXTURE_MAX_ANISOTROPY_EXT, this._anisoSamples), this._anisoSamples
                }
            },
            wrapS: {
                get: function() {
                    return this._wrapS
                },
                set: function(e) {
                    if (this.bind(), o.indexOf(e) < 0) throw new Error("gl-texture2d: Unknown wrap mode " + e);
                    return this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, e), this._wrapS = e
                }
            },
            wrapT: {
                get: function() {
                    return this._wrapT
                },
                set: function(e) {
                    if (this.bind(), o.indexOf(e) < 0) throw new Error("gl-texture2d: Unknown wrap mode " + e);
                    return this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, e), this._wrapT = e
                }
            },
            wrap: {
                get: function() {
                    return this._wrapVector
                },
                set: function(e) {
                    if (2 !== (e = !Array.isArray(e) ? [e, e] : e).length) throw new Error("gl-texture2d: Must specify wrap mode for rows and columns");
                    for (var t = 0; t < 2; ++t)
                        if (o.indexOf(e[t]) < 0) throw new Error("gl-texture2d: Unknown wrap mode " + e);
                    this._wrapS = e[0], this._wrapT = e[1];
                    var r = this.gl;
                    return this.bind(), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, this._wrapS), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, this._wrapT), e
                }
            },
            shape: {
                get: function() {
                    return this._shapeVector
                },
                set: function(e) {
                    if (Array.isArray(e)) {
                        if (2 !== e.length) throw new Error("gl-texture2d: Invalid texture shape")
                    } else e = [0 | e, 0 | e];
                    return s(this, 0 | e[0], 0 | e[1]), [0 | e[0], 0 | e[1]]
                }
            },
            width: {
                get: function() {
                    return this._shape[0]
                },
                set: function(e) {
                    return s(this, e |= 0, this._shape[1]), e
                }
            },
            height: {
                get: function() {
                    return this._shape[1]
                },
                set: function(e) {
                    return s(this, this._shape[0], e |= 0), e
                }
            }
        }), t.bind = function(e) {
            var t = this.gl;
            return void 0 !== e && t.activeTexture(t.TEXTURE0 + (0 | e)), t.bindTexture(t.TEXTURE_2D, this.handle), void 0 !== e ? 0 | e : t.getParameter(t.ACTIVE_TEXTURE) - t.TEXTURE0
        }, t.dispose = function() {
            this.gl.deleteTexture(this.handle)
        }, t.generateMipmap = function() {
            this.bind(), this.gl.generateMipmap(this.gl.TEXTURE_2D);
            for (var e = Math.min(this._shape[0], this._shape[1]), t = 0; 0 < e; ++t, e >>>= 1) this._mipLevels.indexOf(t) < 0 && this._mipLevels.push(t)
        }, t.setPixels = function(e, t, r, n) {
            var i = this.gl;
            this.bind(), Array.isArray(t) ? (n = r, r = 0 | t[1], t = 0 | t[0]) : (t = t || 0, r = r || 0), n = n || 0;
            var o = a(e) ? e : e.raw;
            if (o) this._mipLevels.indexOf(n) < 0 ? (i.texImage2D(i.TEXTURE_2D, 0, this.format, this.format, this.type, o), this._mipLevels.push(n)) : i.texSubImage2D(i.TEXTURE_2D, n, t, r, this.format, this.type, o);
            else {
                if (!(e.shape && e.stride && e.data)) throw new Error("gl-texture2d: Unsupported data type");
                if (e.shape.length < 2 || t + e.shape[1] > this._shape[1] >>> n || r + e.shape[0] > this._shape[0] >>> n || t < 0 || r < 0) throw new Error("gl-texture2d: Texture dimensions are out of bounds");
                ! function(e, t, r, n, i, o, a, s) {
                    var f = s.dtype,
                        c = s.shape.slice();
                    if (c.length < 2 || 3 < c.length) throw new Error("gl-texture2d: Invalid ndarray, must be 2d or 3d");
                    var u = 0,
                        l = 0,
                        h = y(c, s.stride.slice());
                    "float32" === f ? u = e.FLOAT : "float64" === f ? (u = e.FLOAT, h = !1, f = "float32") : "uint8" === f ? u = e.UNSIGNED_BYTE : (u = e.UNSIGNED_BYTE, h = !1, f = "uint8");
                    if (2 === c.length) l = e.LUMINANCE, c = [c[0], c[1], 1], s = g(s.data, c, [s.stride[0], s.stride[1], 1], s.offset);
                    else {
                        if (3 !== c.length) throw new Error("gl-texture2d: Invalid shape for texture");
                        if (1 === c[2]) l = e.ALPHA;
                        else if (2 === c[2]) l = e.LUMINANCE_ALPHA;
                        else if (3 === c[2]) l = e.RGB;
                        else {
                            if (4 !== c[2]) throw new Error("gl-texture2d: Invalid shape for pixel coords");
                            l = e.RGBA
                        }
                        c[2]
                    }
                    l !== e.LUMINANCE && l !== e.ALPHA || i !== e.LUMINANCE && i !== e.ALPHA || (l = i);
                    if (l !== i) throw new Error("gl-texture2d: Incompatible texture format for setPixels");
                    f = s.size, l = a.indexOf(n) < 0;
                    l && a.push(n);
                    u === o && h ? 0 === s.offset && s.data.length === f ? l ? e.texImage2D(e.TEXTURE_2D, n, i, c[0], c[1], 0, i, o, s.data) : e.texSubImage2D(e.TEXTURE_2D, n, t, r, c[0], c[1], i, o, s.data) : l ? e.texImage2D(e.TEXTURE_2D, n, i, c[0], c[1], 0, i, o, s.data.subarray(s.offset, s.offset + f)) : e.texSubImage2D(e.TEXTURE_2D, n, t, r, c[0], c[1], i, o, s.data.subarray(s.offset, s.offset + f)) : (a = o === e.FLOAT ? v.mallocFloat32(f) : v.mallocUint8(f), h = g(a, c, [c[2], c[2] * c[0], 1]), u === e.FLOAT && o === e.UNSIGNED_BYTE ? d(h, s) : p.assign(h, s), l ? e.texImage2D(e.TEXTURE_2D, n, i, c[0], c[1], 0, i, o, a.subarray(0, f)) : e.texSubImage2D(e.TEXTURE_2D, n, t, r, c[0], c[1], i, o, a.subarray(0, f)), o === e.FLOAT ? v.freeFloat32(a) : v.freeUint8(a))
                }(i, t, r, n, this.format, this.type, this._mipLevels, e)
            }
        }
    }, {
        ndarray: 54,
        "ndarray-ops": 53,
        "typedarray-pool": 64
    }],
    35: [function(e, t, r) {
        "use strict";
        t.exports = function(e, t, r) {
            t ? t.bind() : e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, null);
            var n = 0 | e.getParameter(e.MAX_VERTEX_ATTRIBS);
            if (r) {
                if (r.length > n) throw new Error("gl-vao: Too many vertex attributes");
                for (var i = 0; i < r.length; ++i) {
                    var o = r[i];
                    if (o.buffer) {
                        var a = o.buffer,
                            s = o.size || 4,
                            f = o.type || e.FLOAT,
                            c = !!o.normalized,
                            u = o.stride || 0,
                            l = o.offset || 0;
                        a.bind(), e.enableVertexAttribArray(i), e.vertexAttribPointer(i, s, f, c, u, l)
                    } else {
                        if ("number" == typeof o) e.vertexAttrib1f(i, o);
                        else if (1 === o.length) e.vertexAttrib1f(i, o[0]);
                        else if (2 === o.length) e.vertexAttrib2f(i, o[0], o[1]);
                        else if (3 === o.length) e.vertexAttrib3f(i, o[0], o[1], o[2]);
                        else {
                            if (4 !== o.length) throw new Error("gl-vao: Invalid vertex attribute");
                            e.vertexAttrib4f(i, o[0], o[1], o[2], o[3])
                        }
                        e.disableVertexAttribArray(i)
                    }
                }
                for (; i < n; ++i) e.disableVertexAttribArray(i)
            } else {
                e.bindBuffer(e.ARRAY_BUFFER, null);
                for (i = 0; i < n; ++i) e.disableVertexAttribArray(i)
            }
        }
    }, {}],
    36: [function(e, t, r) {
        "use strict";
        var n = e("./do-bind.js");

        function i(e) {
            this.gl = e, this._elements = null, this._attributes = null, this._elementsType = e.UNSIGNED_SHORT
        }
        i.prototype.bind = function() {
            n(this.gl, this._elements, this._attributes)
        }, i.prototype.update = function(e, t, r) {
            this._elements = t, this._attributes = e, this._elementsType = r || this.gl.UNSIGNED_SHORT
        }, i.prototype.dispose = function() {}, i.prototype.unbind = function() {}, i.prototype.draw = function(e, t, r) {
            r = r || 0;
            var n = this.gl;
            this._elements ? n.drawElements(e, t, this._elementsType, r) : n.drawArrays(e, r, t)
        }, t.exports = function(e) {
            return new i(e)
        }
    }, {
        "./do-bind.js": 35
    }],
    37: [function(e, t, r) {
        "use strict";
        var o = e("./do-bind.js");

        function a(e, t, r, n, i, o) {
            this.location = e, this.dimension = t, this.a = r, this.b = n, this.c = i, this.d = o
        }

        function n(e, t, r) {
            this.gl = e, this._ext = t, this.handle = r, this._attribs = [], this._useElements = !1, this._elementsType = e.UNSIGNED_SHORT
        }
        a.prototype.bind = function(e) {
            switch (this.dimension) {
                case 1:
                    e.vertexAttrib1f(this.location, this.a);
                    break;
                case 2:
                    e.vertexAttrib2f(this.location, this.a, this.b);
                    break;
                case 3:
                    e.vertexAttrib3f(this.location, this.a, this.b, this.c);
                    break;
                case 4:
                    e.vertexAttrib4f(this.location, this.a, this.b, this.c, this.d)
            }
        }, n.prototype.bind = function() {
            this._ext.bindVertexArrayOES(this.handle);
            for (var e = 0; e < this._attribs.length; ++e) this._attribs[e].bind(this.gl)
        }, n.prototype.unbind = function() {
            this._ext.bindVertexArrayOES(null)
        }, n.prototype.dispose = function() {
            this._ext.deleteVertexArrayOES(this.handle)
        }, n.prototype.update = function(e, t, r) {
            if (this.bind(), o(this.gl, t, e), this.unbind(), this._attribs.length = 0, e)
                for (var n = 0; n < e.length; ++n) {
                    var i = e[n];
                    "number" == typeof i ? this._attribs.push(new a(n, 1, i)) : Array.isArray(i) && this._attribs.push(new a(n, i.length, i[0], i[1], i[2], i[3]))
                }
            this._useElements = !!t, this._elementsType = r || this.gl.UNSIGNED_SHORT
        }, n.prototype.draw = function(e, t, r) {
            r = r || 0;
            var n = this.gl;
            this._useElements ? n.drawElements(e, t, this._elementsType, r) : n.drawArrays(e, r, t)
        }, t.exports = function(e, t) {
            return new n(e, t, t.createVertexArrayOES())
        }
    }, {
        "./do-bind.js": 35
    }],
    38: [function(e, t, r) {
        "use strict";
        var o = e("./lib/vao-native.js"),
            a = e("./lib/vao-emulated.js");

        function s(e) {
            this.bindVertexArrayOES = e.bindVertexArray.bind(e), this.createVertexArrayOES = e.createVertexArray.bind(e), this.deleteVertexArrayOES = e.deleteVertexArray.bind(e)
        }
        t.exports = function(e, t, r, n) {
            var i = e.createVertexArray ? new s(e) : e.getExtension("OES_vertex_array_object");
            return (e = i ? o(e, i) : a(e)).update(t, r, n), e
        }
    }, {
        "./lib/vao-emulated.js": 36,
        "./lib/vao-native.js": 37
    }],
    39: [function(e, t, r) {
        var o = e("glsl-tokenizer"),
            a = e("atob-lite");
        t.exports = function(e) {
            for (var t = Array.isArray(e) ? e : o(e), r = 0; r < t.length; r++) {
                var n = t[r];
                if ("preprocessor" === n.type) {
                    var i = n.data.match(/\#define\s+SHADER_NAME(_B64)?\s+(.+)$/);
                    if (i && i[2]) {
                        n = i[1], i = i[2];
                        return (n ? a(i) : i).trim()
                    }
                }
            }
        }
    }, {
        "atob-lite": 7,
        "glsl-tokenizer": 46
    }],
    40: [function(e, t, r) {
        t.exports = function(e) {
            var r, n, i, o = 0,
                a = 0,
                s = P,
                f = [],
                c = [],
                u = 1,
                l = 0,
                h = 0,
                g = !1,
                p = !1,
                v = "",
                t = A,
                d = b;
            "300 es" === (e = e || {}).version && (t = R, d = T);
            for (var y = {}, _ = {}, o = 0; o < t.length; o++) y[t[o]] = !0;
            for (o = 0; o < d.length; o++) _[d[o]] = !0;
            return function(e) {
                return c = [], null !== e ? function(e) {
                    o = 0, e.toString && (e = e.toString());
                    var t;
                    v += e.replace(/\r\n/g, "\n"), i = v.length;
                    for (; r = v[o], o < i;) {
                        switch (t = o, s) {
                            case S:
                                "/" !== r || "*" !== n ? (f.push(r), n = r) : (f.push(r), x(f.join("")), s = P), o += 1;
                                break;
                            case M:
                            case U:
                                o = m();
                                break;
                            case N:
                                o = function() {
                                    if ("." === n && /\d/.test(r)) return s = L, o;
                                    if ("/" === n && "*" === r) return s = S, o;
                                    if ("/" === n && "/" === r) return s = M, o;
                                    if ("." === r && f.length) {
                                        for (; E(f););
                                        return s = L, o
                                    }
                                    if (";" === r || ")" === r || "(" === r) {
                                        if (f.length)
                                            for (; E(f););
                                        return x(r), s = P, o + 1
                                    }
                                    var e = 2 === f.length && "=" !== r;
                                    if (/[\w_\d\s]/.test(r) || e) {
                                        for (; E(f););
                                        return s = P, o
                                    }
                                    return f.push(r), n = r, o + 1
                                }();
                                break;
                            case z:
                                o = function() {
                                    if ("." === r) return f.push(r), s = L, n = r, o + 1;
                                    if (/[eE]/.test(r)) return f.push(r), s = L, n = r, o + 1;
                                    if ("x" === r && 1 === f.length && "0" === f[0]) return s = j, f.push(r), n = r, o + 1;
                                    if (/[^\d]/.test(r)) return x(f.join("")), s = P, o;
                                    return f.push(r), n = r, o + 1
                                }();
                                break;
                            case j:
                                o = function() {
                                    if (/[^a-fA-F0-9]/.test(r)) return x(f.join("")), s = P, o;
                                    return f.push(r), n = r, o + 1
                                }();
                                break;
                            case L:
                                o = function() {
                                    "f" === r && (f.push(r), n = r, o += 1);
                                    if (/[eE]/.test(r)) return f.push(r), n = r, o + 1;
                                    if (("-" === r || "+" === r) && /[eE]/.test(n)) return f.push(r), n = r, o + 1;
                                    if (/[^\d]/.test(r)) return x(f.join("")), s = P, o;
                                    return f.push(r), n = r, o + 1
                                }();
                                break;
                            case I:
                                o = function() {
                                    if (/[^\d\w_]/.test(r)) {
                                        var e = f.join("");
                                        return s = _[e] ? O : y[e] ? F : C, x(f.join("")), s = P, o
                                    }
                                    return f.push(r), n = r, o + 1
                                }();
                                break;
                            case D:
                                o = function() {
                                    if (/[^\s]/g.test(r)) return x(f.join("")), s = P, o;
                                    return f.push(r), n = r, o + 1
                                }();
                                break;
                            case P:
                                o = function() {
                                    if (f = f.length ? [] : f, "/" === n && "*" === r) return h = a + o - 1, s = S, n = r, o + 1;
                                    if ("/" === n && "/" === r) return h = a + o - 1, s = M, n = r, o + 1;
                                    if ("#" === r) return s = U, h = a + o, o;
                                    if (/\s/.test(r)) return s = D, h = a + o, o;
                                    return g = /\d/.test(r), p = /[^\w_]/.test(r), h = a + o, s = g ? z : p ? N : I, o
                                }()
                        }
                        t !== o && ("\n" === v[t] ? (l = 0, ++u) : ++l)
                    }
                    return a += o, v = v.slice(o), c
                }(e) : function() {
                    f.length && x(f.join(""));
                    return s = B, x("(eof)"), c
                }()
            };

            function x(e) {
                e.length && c.push({
                    type: V[s],
                    data: e,
                    position: h,
                    line: u,
                    column: l
                })
            }

            function m() {
                return "\r" !== r && "\n" !== r || "\\" === n ? (f.push(r), n = r, o + 1) : (x(f.join("")), s = P, o)
            }

            function E(e) {
                var t, r, n = 0;
                do {
                    if (t = w.indexOf(e.slice(0, e.length + n).join("")), r = w[t], -1 === t) {
                        if (0 < n-- + e.length) continue;
                        r = e.slice(0, 1).join("")
                    }
                    return x(r), h += r.length, (f = f.slice(r.length)).length
                } while (1)
            }
        };
        var b = e("./lib/literals"),
            w = e("./lib/operators"),
            A = e("./lib/builtins"),
            T = e("./lib/literals-300es"),
            R = e("./lib/builtins-300es"),
            P = 999,
            I = 9999,
            S = 0,
            M = 1,
            U = 2,
            N = 3,
            z = 4,
            L = 5,
            C = 6,
            F = 7,
            O = 8,
            D = 9,
            B = 10,
            j = 11,
            V = ["block-comment", "line-comment", "preprocessor", "operator", "integer", "float", "ident", "builtin", "keyword", "whitespace", "eof", "integer"]
    }, {
        "./lib/builtins": 42,
        "./lib/builtins-300es": 41,
        "./lib/literals": 44,
        "./lib/literals-300es": 43,
        "./lib/operators": 45
    }],
    41: [function(e, t, r) {
        e = (e = e("./builtins")).slice().filter(function(e) {
            return !/^(gl\_|texture)/.test(e)
        });
        t.exports = e.concat(["gl_VertexID", "gl_InstanceID", "gl_Position", "gl_PointSize", "gl_FragCoord", "gl_FrontFacing", "gl_FragDepth", "gl_PointCoord", "gl_MaxVertexAttribs", "gl_MaxVertexUniformVectors", "gl_MaxVertexOutputVectors", "gl_MaxFragmentInputVectors", "gl_MaxVertexTextureImageUnits", "gl_MaxCombinedTextureImageUnits", "gl_MaxTextureImageUnits", "gl_MaxFragmentUniformVectors", "gl_MaxDrawBuffers", "gl_MinProgramTexelOffset", "gl_MaxProgramTexelOffset", "gl_DepthRangeParameters", "gl_DepthRange", "trunc", "round", "roundEven", "isnan", "isinf", "floatBitsToInt", "floatBitsToUint", "intBitsToFloat", "uintBitsToFloat", "packSnorm2x16", "unpackSnorm2x16", "packUnorm2x16", "unpackUnorm2x16", "packHalf2x16", "unpackHalf2x16", "outerProduct", "transpose", "determinant", "inverse", "texture", "textureSize", "textureProj", "textureLod", "textureOffset", "texelFetch", "texelFetchOffset", "textureProjOffset", "textureLodOffset", "textureProjLod", "textureProjLodOffset", "textureGrad", "textureGradOffset", "textureProjGrad", "textureProjGradOffset"])
    }, {
        "./builtins": 42
    }],
    42: [function(e, t, r) {
        t.exports = ["abs", "acos", "all", "any", "asin", "atan", "ceil", "clamp", "cos", "cross", "dFdx", "dFdy", "degrees", "distance", "dot", "equal", "exp", "exp2", "faceforward", "floor", "fract", "gl_BackColor", "gl_BackLightModelProduct", "gl_BackLightProduct", "gl_BackMaterial", "gl_BackSecondaryColor", "gl_ClipPlane", "gl_ClipVertex", "gl_Color", "gl_DepthRange", "gl_DepthRangeParameters", "gl_EyePlaneQ", "gl_EyePlaneR", "gl_EyePlaneS", "gl_EyePlaneT", "gl_Fog", "gl_FogCoord", "gl_FogFragCoord", "gl_FogParameters", "gl_FragColor", "gl_FragCoord", "gl_FragData", "gl_FragDepth", "gl_FragDepthEXT", "gl_FrontColor", "gl_FrontFacing", "gl_FrontLightModelProduct", "gl_FrontLightProduct", "gl_FrontMaterial", "gl_FrontSecondaryColor", "gl_LightModel", "gl_LightModelParameters", "gl_LightModelProducts", "gl_LightProducts", "gl_LightSource", "gl_LightSourceParameters", "gl_MaterialParameters", "gl_MaxClipPlanes", "gl_MaxCombinedTextureImageUnits", "gl_MaxDrawBuffers", "gl_MaxFragmentUniformComponents", "gl_MaxLights", "gl_MaxTextureCoords", "gl_MaxTextureImageUnits", "gl_MaxTextureUnits", "gl_MaxVaryingFloats", "gl_MaxVertexAttribs", "gl_MaxVertexTextureImageUnits", "gl_MaxVertexUniformComponents", "gl_ModelViewMatrix", "gl_ModelViewMatrixInverse", "gl_ModelViewMatrixInverseTranspose", "gl_ModelViewMatrixTranspose", "gl_ModelViewProjectionMatrix", "gl_ModelViewProjectionMatrixInverse", "gl_ModelViewProjectionMatrixInverseTranspose", "gl_ModelViewProjectionMatrixTranspose", "gl_MultiTexCoord0", "gl_MultiTexCoord1", "gl_MultiTexCoord2", "gl_MultiTexCoord3", "gl_MultiTexCoord4", "gl_MultiTexCoord5", "gl_MultiTexCoord6", "gl_MultiTexCoord7", "gl_Normal", "gl_NormalMatrix", "gl_NormalScale", "gl_ObjectPlaneQ", "gl_ObjectPlaneR", "gl_ObjectPlaneS", "gl_ObjectPlaneT", "gl_Point", "gl_PointCoord", "gl_PointParameters", "gl_PointSize", "gl_Position", "gl_ProjectionMatrix", "gl_ProjectionMatrixInverse", "gl_ProjectionMatrixInverseTranspose", "gl_ProjectionMatrixTranspose", "gl_SecondaryColor", "gl_TexCoord", "gl_TextureEnvColor", "gl_TextureMatrix", "gl_TextureMatrixInverse", "gl_TextureMatrixInverseTranspose", "gl_TextureMatrixTranspose", "gl_Vertex", "greaterThan", "greaterThanEqual", "inversesqrt", "length", "lessThan", "lessThanEqual", "log", "log2", "matrixCompMult", "max", "min", "mix", "mod", "normalize", "not", "notEqual", "pow", "radians", "reflect", "refract", "sign", "sin", "smoothstep", "sqrt", "step", "tan", "texture2D", "texture2DLod", "texture2DProj", "texture2DProjLod", "textureCube", "textureCubeLod", "texture2DLodEXT", "texture2DProjLodEXT", "textureCubeLodEXT", "texture2DGradEXT", "texture2DProjGradEXT", "textureCubeGradEXT"]
    }, {}],
    43: [function(e, t, r) {
        e = e("./literals");
        t.exports = e.slice().concat(["layout", "centroid", "smooth", "case", "mat2x2", "mat2x3", "mat2x4", "mat3x2", "mat3x3", "mat3x4", "mat4x2", "mat4x3", "mat4x4", "uvec2", "uvec3", "uvec4", "samplerCubeShadow", "sampler2DArray", "sampler2DArrayShadow", "isampler2D", "isampler3D", "isamplerCube", "isampler2DArray", "usampler2D", "usampler3D", "usamplerCube", "usampler2DArray", "coherent", "restrict", "readonly", "writeonly", "resource", "atomic_uint", "noperspective", "patch", "sample", "subroutine", "common", "partition", "active", "filter", "image1D", "image2D", "image3D", "imageCube", "iimage1D", "iimage2D", "iimage3D", "iimageCube", "uimage1D", "uimage2D", "uimage3D", "uimageCube", "image1DArray", "image2DArray", "iimage1DArray", "iimage2DArray", "uimage1DArray", "uimage2DArray", "image1DShadow", "image2DShadow", "image1DArrayShadow", "image2DArrayShadow", "imageBuffer", "iimageBuffer", "uimageBuffer", "sampler1DArray", "sampler1DArrayShadow", "isampler1D", "isampler1DArray", "usampler1D", "usampler1DArray", "isampler2DRect", "usampler2DRect", "samplerBuffer", "isamplerBuffer", "usamplerBuffer", "sampler2DMS", "isampler2DMS", "usampler2DMS", "sampler2DMSArray", "isampler2DMSArray", "usampler2DMSArray"])
    }, {
        "./literals": 44
    }],
    44: [function(e, t, r) {
        t.exports = ["precision", "highp", "mediump", "lowp", "attribute", "const", "uniform", "varying", "break", "continue", "do", "for", "while", "if", "else", "in", "out", "inout", "float", "int", "uint", "void", "bool", "true", "false", "discard", "return", "mat2", "mat3", "mat4", "vec2", "vec3", "vec4", "ivec2", "ivec3", "ivec4", "bvec2", "bvec3", "bvec4", "sampler1D", "sampler2D", "sampler3D", "samplerCube", "sampler1DShadow", "sampler2DShadow", "struct", "asm", "class", "union", "enum", "typedef", "template", "this", "packed", "goto", "switch", "default", "inline", "noinline", "volatile", "public", "static", "extern", "external", "interface", "long", "short", "double", "half", "fixed", "unsigned", "input", "output", "hvec2", "hvec3", "hvec4", "dvec2", "dvec3", "dvec4", "fvec2", "fvec3", "fvec4", "sampler2DRect", "sampler3DRect", "sampler2DRectShadow", "sizeof", "cast", "namespace", "using"]
    }, {}],
    45: [function(e, t, r) {
        t.exports = ["<<=", ">>=", "++", "--", "<<", ">>", "<=", ">=", "==", "!=", "&&", "||", "+=", "-=", "*=", "/=", "%=", "&=", "^^", "^=", "|=", "(", ")", "[", "]", ".", "!", "~", "*", "/", "%", "+", "-", "<", ">", "&", "^", "|", "?", ":", "=", ",", ";", "{", "}"]
    }, {}],
    46: [function(e, t, r) {
        var n = e("./index");
        t.exports = function(e, t) {
            var r = n(t),
                t = [];
            return t = (t = t.concat(r(e))).concat(r(null))
        }
    }, {
        "./index": 40
    }],
    47: [function(e, t, r) {
        t.exports = function(e) {
            "string" == typeof e && (e = [e]);
            for (var t = [].slice.call(arguments, 1), r = [], n = 0; n < e.length - 1; n++) r.push(e[n], t[n] || "");
            return r.push(e[n]), r.join("")
        }
    }, {}],
    48: [function(e, t, r) {
        r.read = function(e, t, r, n, i) {
            var o, a, s = 8 * i - n - 1,
                f = (1 << s) - 1,
                c = f >> 1,
                u = -7,
                l = r ? i - 1 : 0,
                h = r ? -1 : 1,
                r = e[t + l];
            for (l += h, o = r & (1 << -u) - 1, r >>= -u, u += s; 0 < u; o = 256 * o + e[t + l], l += h, u -= 8);
            for (a = o & (1 << -u) - 1, o >>= -u, u += n; 0 < u; a = 256 * a + e[t + l], l += h, u -= 8);
            if (0 === o) o = 1 - c;
            else {
                if (o === f) return a ? NaN : 1 / 0 * (r ? -1 : 1);
                a += Math.pow(2, n), o -= c
            }
            return (r ? -1 : 1) * a * Math.pow(2, o - n)
        }, r.write = function(e, t, r, n, i, o) {
            var a, s, f = 8 * o - i - 1,
                c = (1 << f) - 1,
                u = c >> 1,
                l = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                h = n ? 0 : o - 1,
                g = n ? 1 : -1,
                o = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
            for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (s = isNaN(t) ? 1 : 0, a = c) : (a = Math.floor(Math.log(t) / Math.LN2), t * (n = Math.pow(2, -a)) < 1 && (a--, n *= 2), 2 <= (t += 1 <= a + u ? l / n : l * Math.pow(2, 1 - u)) * n && (a++, n /= 2), c <= a + u ? (s = 0, a = c) : 1 <= a + u ? (s = (t * n - 1) * Math.pow(2, i), a += u) : (s = t * Math.pow(2, u - 1) * Math.pow(2, i), a = 0)); 8 <= i; e[r + h] = 255 & s, h += g, s /= 256, i -= 8);
            for (a = a << i | s, f += i; 0 < f; e[r + h] = 255 & a, h += g, a /= 256, f -= 8);
            e[r + h - g] |= 128 * o
        }
    }, {}],
    49: [function(e, t, r) {
        "function" == typeof Object.create ? t.exports = function(e, t) {
            t && (e.super_ = t, e.prototype = Object.create(t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }))
        } : t.exports = function(e, t) {
            var r;
            t && (e.super_ = t, (r = function() {}).prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e)
        }
    }, {}],
    50: [function(e, t, r) {
        "use strict";
        t.exports = function(e) {
            for (var t = new Array(e), r = 0; r < e; ++r) t[r] = r;
            return t
        }
    }, {}],
    51: [function(e, t, r) {
        function n(e) {
            return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e)
        }
        t.exports = function(e) {
            return null != e && (n(e) || "function" == typeof(t = e).readFloatLE && "function" == typeof t.slice && n(t.slice(0, 0)) || !!e._isBuffer);
            var t
        }
    }, {}],
    52: [function(e, t, r) {
        "use strict";
        var n = e("cwise/lib/wrapper")({
            args: ["index", "array", "scalar"],
            pre: {
                body: "{}",
                args: [],
                thisVars: [],
                localVars: []
            },
            body: {
                body: "{_inline_1_arg1_=_inline_1_arg2_.apply(void 0,_inline_1_arg0_)}",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }, {
                    name: "_inline_1_arg1_",
                    lvalue: !0,
                    rvalue: !1,
                    count: 1
                }, {
                    name: "_inline_1_arg2_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                thisVars: [],
                localVars: []
            },
            post: {
                body: "{}",
                args: [],
                thisVars: [],
                localVars: []
            },
            debug: !1,
            funcName: "cwise",
            blockSize: 64
        });
        t.exports = function(e, t) {
            return n(e, t), e
        }
    }, {
        "cwise/lib/wrapper": 15
    }],
    53: [function(e, t, r) {
        "use strict";
        var i = e("cwise-compiler"),
            n = {
                body: "",
                args: [],
                thisVars: [],
                localVars: []
            };

        function o(e) {
            if (!e) return n;
            for (var t = 0; t < e.args.length; ++t) {
                var r = e.args[t];
                e.args[t] = 0 === t ? {
                    name: r,
                    lvalue: !0,
                    rvalue: !!e.rvalue,
                    count: e.count || 1
                } : {
                    name: r,
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }
            }
            return e.thisVars || (e.thisVars = []), e.localVars || (e.localVars = []), e
        }

        function a(e) {
            for (var t, r = [], n = 0; n < e.args.length; ++n) r.push("a" + n);
            return new Function("P", ["return function ", e.funcName, "_ndarrayops(", r.join(","), ") {P(", r.join(","), ");return a0}"].join(""))(i({
                args: (t = e).args,
                pre: o(t.pre),
                body: o(t.body),
                post: o(t.proc),
                funcName: t.funcName
            }))
        }
        var s = {
            add: "+",
            sub: "-",
            mul: "*",
            div: "/",
            mod: "%",
            band: "&",
            bor: "|",
            bxor: "^",
            lshift: "<<",
            rshift: ">>",
            rrshift: ">>>"
        };
        ! function() {
            for (var e in s) {
                var t = s[e];
                r[e] = a({
                    args: ["array", "array", "array"],
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=b" + t + "c"
                    },
                    funcName: e
                }), r[e + "eq"] = a({
                    args: ["array", "array"],
                    body: {
                        args: ["a", "b"],
                        body: "a" + t + "=b"
                    },
                    rvalue: !0,
                    funcName: e + "eq"
                }), r[e + "s"] = a({
                    args: ["array", "array", "scalar"],
                    body: {
                        args: ["a", "b", "s"],
                        body: "a=b" + t + "s"
                    },
                    funcName: e + "s"
                }), r[e + "seq"] = a({
                    args: ["array", "scalar"],
                    body: {
                        args: ["a", "s"],
                        body: "a" + t + "=s"
                    },
                    rvalue: !0,
                    funcName: e + "seq"
                })
            }
        }();
        var f = {
            not: "!",
            bnot: "~",
            neg: "-",
            recip: "1.0/"
        };
        ! function() {
            for (var e in f) {
                var t = f[e];
                r[e] = a({
                    args: ["array", "array"],
                    body: {
                        args: ["a", "b"],
                        body: "a=" + t + "b"
                    },
                    funcName: e
                }), r[e + "eq"] = a({
                    args: ["array"],
                    body: {
                        args: ["a"],
                        body: "a=" + t + "a"
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: e + "eq"
                })
            }
        }();
        var c = {
            and: "&&",
            or: "||",
            eq: "===",
            neq: "!==",
            lt: "<",
            gt: ">",
            leq: "<=",
            geq: ">="
        };
        ! function() {
            for (var e in c) {
                var t = c[e];
                r[e] = a({
                    args: ["array", "array", "array"],
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=b" + t + "c"
                    },
                    funcName: e
                }), r[e + "s"] = a({
                    args: ["array", "array", "scalar"],
                    body: {
                        args: ["a", "b", "s"],
                        body: "a=b" + t + "s"
                    },
                    funcName: e + "s"
                }), r[e + "eq"] = a({
                    args: ["array", "array"],
                    body: {
                        args: ["a", "b"],
                        body: "a=a" + t + "b"
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: e + "eq"
                }), r[e + "seq"] = a({
                    args: ["array", "scalar"],
                    body: {
                        args: ["a", "s"],
                        body: "a=a" + t + "s"
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: e + "seq"
                })
            }
        }();
        var u = ["abs", "acos", "asin", "atan", "ceil", "cos", "exp", "floor", "log", "round", "sin", "sqrt", "tan"];
        ! function() {
            for (var e = 0; e < u.length; ++e) {
                var t = u[e];
                r[t] = a({
                    args: ["array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + t,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(b)",
                        thisVars: ["this_f"]
                    },
                    funcName: t
                }), r[t + "eq"] = a({
                    args: ["array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + t,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a"],
                        body: "a=this_f(a)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: t + "eq"
                })
            }
        }();
        var l = ["max", "min", "atan2", "pow"];
        ! function() {
            for (var e = 0; e < l.length; ++e) {
                var t = l[e];
                r[t] = a({
                    args: ["array", "array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + t,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(b,c)",
                        thisVars: ["this_f"]
                    },
                    funcName: t
                }), r[t + "s"] = a({
                    args: ["array", "array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + t,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(b,c)",
                        thisVars: ["this_f"]
                    },
                    funcName: t + "s"
                }), r[t + "eq"] = a({
                    args: ["array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + t,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(a,b)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: t + "eq"
                }), r[t + "seq"] = a({
                    args: ["array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + t,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(a,b)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: t + "seq"
                })
            }
        }();
        var h = ["atan2", "pow"];
        ! function() {
            for (var e = 0; e < h.length; ++e) {
                var t = h[e];
                r[t + "op"] = a({
                    args: ["array", "array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + t,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(c,b)",
                        thisVars: ["this_f"]
                    },
                    funcName: t + "op"
                }), r[t + "ops"] = a({
                    args: ["array", "array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + t,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b", "c"],
                        body: "a=this_f(c,b)",
                        thisVars: ["this_f"]
                    },
                    funcName: t + "ops"
                }), r[t + "opeq"] = a({
                    args: ["array", "array"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + t,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(b,a)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: t + "opeq"
                }), r[t + "opseq"] = a({
                    args: ["array", "scalar"],
                    pre: {
                        args: [],
                        body: "this_f=Math." + t,
                        thisVars: ["this_f"]
                    },
                    body: {
                        args: ["a", "b"],
                        body: "a=this_f(b,a)",
                        thisVars: ["this_f"]
                    },
                    rvalue: !0,
                    count: 2,
                    funcName: t + "opseq"
                })
            }
        }(), r.any = i({
            args: ["array"],
            pre: n,
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "if(a){return true}",
                localVars: [],
                thisVars: []
            },
            post: {
                args: [],
                localVars: [],
                thisVars: [],
                body: "return false"
            },
            funcName: "any"
        }), r.all = i({
            args: ["array"],
            pre: n,
            body: {
                args: [{
                    name: "x",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "if(!x){return false}",
                localVars: [],
                thisVars: []
            },
            post: {
                args: [],
                localVars: [],
                thisVars: [],
                body: "return true"
            },
            funcName: "all"
        }), r.sum = i({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "this_s+=a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "sum"
        }), r.prod = i({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=1"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "this_s*=a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "prod"
        }), r.norm2squared = i({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                body: "this_s+=a*a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "norm2squared"
        }), r.norm2 = i({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                body: "this_s+=a*a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return Math.sqrt(this_s)"
            },
            funcName: "norm2"
        }), r.norminf = i({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 4
                }],
                body: "if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "norminf"
        }), r.norm1 = i({
            args: ["array"],
            pre: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "this_s=0"
            },
            body: {
                args: [{
                    name: "a",
                    lvalue: !1,
                    rvalue: !0,
                    count: 3
                }],
                body: "this_s+=a<0?-a:a",
                localVars: [],
                thisVars: ["this_s"]
            },
            post: {
                args: [],
                localVars: [],
                thisVars: ["this_s"],
                body: "return this_s"
            },
            funcName: "norm1"
        }), r.sup = i({
            args: ["array"],
            pre: {
                body: "this_h=-Infinity",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            },
            body: {
                body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_h"],
                localVars: []
            },
            post: {
                body: "return this_h",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            }
        }), r.inf = i({
            args: ["array"],
            pre: {
                body: "this_h=Infinity",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            },
            body: {
                body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_h"],
                localVars: []
            },
            post: {
                body: "return this_h",
                args: [],
                thisVars: ["this_h"],
                localVars: []
            }
        }), r.argmin = i({
            args: ["index", "array", "shape"],
            pre: {
                body: "{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
                args: [{
                    name: "_inline_0_arg0_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg1_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg2_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                thisVars: ["this_i", "this_v"],
                localVars: []
            },
            body: {
                body: "{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }, {
                    name: "_inline_1_arg1_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_i", "this_v"],
                localVars: ["_inline_1_k"]
            },
            post: {
                body: "{return this_i}",
                args: [],
                thisVars: ["this_i"],
                localVars: []
            }
        }), r.argmax = i({
            args: ["index", "array", "shape"],
            pre: {
                body: "{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
                args: [{
                    name: "_inline_0_arg0_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg1_",
                    lvalue: !1,
                    rvalue: !1,
                    count: 0
                }, {
                    name: "_inline_0_arg2_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                thisVars: ["this_i", "this_v"],
                localVars: []
            },
            body: {
                body: "{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
                args: [{
                    name: "_inline_1_arg0_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }, {
                    name: "_inline_1_arg1_",
                    lvalue: !1,
                    rvalue: !0,
                    count: 2
                }],
                thisVars: ["this_i", "this_v"],
                localVars: ["_inline_1_k"]
            },
            post: {
                body: "{return this_i}",
                args: [],
                thisVars: ["this_i"],
                localVars: []
            }
        }), r.random = a({
            args: ["array"],
            pre: {
                args: [],
                body: "this_f=Math.random",
                thisVars: ["this_f"]
            },
            body: {
                args: ["a"],
                body: "a=this_f()",
                thisVars: ["this_f"]
            },
            funcName: "random"
        }), r.assign = a({
            args: ["array", "array"],
            body: {
                args: ["a", "b"],
                body: "a=b"
            },
            funcName: "assign"
        }), r.assigns = a({
            args: ["array", "scalar"],
            body: {
                args: ["a", "b"],
                body: "a=b"
            },
            funcName: "assigns"
        }), r.equals = i({
            args: ["array", "array"],
            pre: n,
            body: {
                args: [{
                    name: "x",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }, {
                    name: "y",
                    lvalue: !1,
                    rvalue: !0,
                    count: 1
                }],
                body: "if(x!==y){return false}",
                localVars: [],
                thisVars: []
            },
            post: {
                args: [],
                localVars: [],
                thisVars: [],
                body: "return true"
            },
            funcName: "equals"
        })
    }, {
        "cwise-compiler": 12
    }],
    54: [function(e, t, r) {
        var g = e("iota-array"),
            c = e("is-buffer"),
            u = "undefined" != typeof Float64Array;

        function i(e, t) {
            return e[0] - t[0]
        }

        function p() {
            for (var e = this.stride, t = new Array(e.length), r = 0; r < t.length; ++r) t[r] = [Math.abs(e[r]), r];
            t.sort(i);
            var n = new Array(t.length);
            for (r = 0; r < n.length; ++r) n[r] = t[r][1];
            return n
        }

        function l(e, t) {
            var r = ["View", t, "d", e].join("");
            t < 0 && (r = "View_Nil" + e);
            var n = "generic" === e;
            if (-1 === t) {
                var i = "function " + r + "(a){this.data=a;};var proto=" + r + ".prototype;proto.dtype='" + e + "';proto.index=function(){return -1};proto.size=0;proto.dimension=-1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function(){return new " + r + "(this.data);};proto.get=proto.set=function(){};proto.pick=function(){return null};return function construct_" + r + "(a){return new " + r + "(a);}";
                return new Function(i)()
            }
            if (0 === t) {
                i = "function " + r + "(a,d) {this.data = a;this.offset = d};var proto=" + r + ".prototype;proto.dtype='" + e + "';proto.index=function(){return this.offset};proto.dimension=0;proto.size=1;proto.shape=proto.stride=proto.order=[];proto.lo=proto.hi=proto.transpose=proto.step=function " + r + "_copy() {return new " + r + "(this.data,this.offset)};proto.pick=function " + r + "_pick(){return TrivialArray(this.data);};proto.valueOf=proto.get=function " + r + "_get(){return " + (n ? "this.data.get(this.offset)" : "this.data[this.offset]") + "};proto.set=function " + r + "_set(v){return " + (n ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v") + "};return function construct_" + r + "(a,b,c,d){return new " + r + "(a,d)}";
                return new Function("TrivialArray", i)(v[e][0])
            }
            var i = ["'use strict'"],
                o = g(t),
                a = o.map(function(e) {
                    return "i" + e
                }),
                s = "this.offset+" + o.map(function(e) {
                    return "this.stride[" + e + "]*i" + e
                }).join("+"),
                f = o.map(function(e) {
                    return "b" + e
                }).join(","),
                c = o.map(function(e) {
                    return "c" + e
                }).join(",");
            i.push("function " + r + "(a," + f + "," + c + ",d){this.data=a", "this.shape=[" + f + "]", "this.stride=[" + c + "]", "this.offset=d|0}", "var proto=" + r + ".prototype", "proto.dtype='" + e + "'", "proto.dimension=" + t), i.push("Object.defineProperty(proto,'size',{get:function " + r + "_size(){return " + o.map(function(e) {
                return "this.shape[" + e + "]"
            }).join("*"), "}})"), 1 === t ? i.push("proto.order=[0]") : (i.push("Object.defineProperty(proto,'order',{get:"), t < 4 ? (i.push("function " + r + "_order(){"), 2 === t ? i.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})") : 3 === t && i.push("var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);if(s0>s1){if(s1>s2){return [2,1,0];}else if(s0>s2){return [1,2,0];}else{return [1,0,2];}}else if(s0>s2){return [2,0,1];}else if(s2>s1){return [0,1,2];}else{return [0,2,1];}}})")) : i.push("ORDER})")), i.push("proto.set=function " + r + "_set(" + a.join(",") + ",v){"), n ? i.push("return this.data.set(" + s + ",v)}") : i.push("return this.data[" + s + "]=v}"), i.push("proto.get=function " + r + "_get(" + a.join(",") + "){"), n ? i.push("return this.data.get(" + s + ")}") : i.push("return this.data[" + s + "]}"), i.push("proto.index=function " + r + "_index(", a.join(), "){return " + s + "}"), i.push("proto.hi=function " + r + "_hi(" + a.join(",") + "){return new " + r + "(this.data," + o.map(function(e) {
                return ["(typeof i", e, "!=='number'||i", e, "<0)?this.shape[", e, "]:i", e, "|0"].join("")
            }).join(",") + "," + o.map(function(e) {
                return "this.stride[" + e + "]"
            }).join(",") + ",this.offset)}");
            n = o.map(function(e) {
                return "a" + e + "=this.shape[" + e + "]"
            }), s = o.map(function(e) {
                return "c" + e + "=this.stride[" + e + "]"
            });
            i.push("proto.lo=function " + r + "_lo(" + a.join(",") + "){var b=this.offset,d=0," + n.join(",") + "," + s.join(","));
            for (var u = 0; u < t; ++u) i.push("if(typeof i" + u + "==='number'&&i" + u + ">=0){d=i" + u + "|0;b+=c" + u + "*d;a" + u + "-=d}");
            i.push("return new " + r + "(this.data," + o.map(function(e) {
                return "a" + e
            }).join(",") + "," + o.map(function(e) {
                return "c" + e
            }).join(",") + ",b)}"), i.push("proto.step=function " + r + "_step(" + a.join(",") + "){var " + o.map(function(e) {
                return "a" + e + "=this.shape[" + e + "]"
            }).join(",") + "," + o.map(function(e) {
                return "b" + e + "=this.stride[" + e + "]"
            }).join(",") + ",c=this.offset,d=0,ceil=Math.ceil");
            for (u = 0; u < t; ++u) i.push("if(typeof i" + u + "==='number'){d=i" + u + "|0;if(d<0){c+=b" + u + "*(a" + u + "-1);a" + u + "=ceil(-a" + u + "/d)}else{a" + u + "=ceil(a" + u + "/d)}b" + u + "*=d}");
            i.push("return new " + r + "(this.data," + o.map(function(e) {
                return "a" + e
            }).join(",") + "," + o.map(function(e) {
                return "b" + e
            }).join(",") + ",c)}");
            for (var l = new Array(t), h = new Array(t), u = 0; u < t; ++u) l[u] = "a[i" + u + "]", h[u] = "b[i" + u + "]";
            i.push("proto.transpose=function " + r + "_transpose(" + a + "){" + a.map(function(e, t) {
                return e + "=(" + e + "===undefined?" + t + ":" + e + "|0)"
            }).join(";"), "var a=this.shape,b=this.stride;return new " + r + "(this.data," + l.join(",") + "," + h.join(",") + ",this.offset)}"), i.push("proto.pick=function " + r + "_pick(" + a + "){var a=[],b=[],c=this.offset");
            for (u = 0; u < t; ++u) i.push("if(typeof i" + u + "==='number'&&i" + u + ">=0){c=(c+this.stride[" + u + "]*i" + u + ")|0}else{a.push(this.shape[" + u + "]);b.push(this.stride[" + u + "])}");
            return i.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}"), i.push("return function construct_" + r + "(data,shape,stride,offset){return new " + r + "(data," + o.map(function(e) {
                return "shape[" + e + "]"
            }).join(",") + "," + o.map(function(e) {
                return "stride[" + e + "]"
            }).join(",") + ",offset)}"), new Function("CTOR_LIST", "ORDER", i.join("\n"))(v[e], p)
        }
        var v = {
            float32: [],
            float64: [],
            int8: [],
            int16: [],
            int32: [],
            uint8: [],
            uint16: [],
            uint32: [],
            array: [],
            uint8_clamped: [],
            bigint64: [],
            biguint64: [],
            buffer: [],
            generic: []
        };
        t.exports = function(e, t, r, n) {
            if (void 0 === e) return (0, v.array[0])([]);
            "number" == typeof e && (e = [e]);
            var i = (t = void 0 === t ? [e.length] : t).length;
            if (void 0 === r) {
                r = new Array(i);
                for (var o = i - 1, a = 1; 0 <= o; --o) r[o] = a, a *= t[o]
            }
            if (void 0 === n)
                for (o = n = 0; o < i; ++o) r[o] < 0 && (n -= (t[o] - 1) * r[o]);
            for (var s = function(e) {
                    if (c(e)) return "buffer";
                    if (u) switch (Object.prototype.toString.call(e)) {
                        case "[object Float64Array]":
                            return "float64";
                        case "[object Float32Array]":
                            return "float32";
                        case "[object Int8Array]":
                            return "int8";
                        case "[object Int16Array]":
                            return "int16";
                        case "[object Int32Array]":
                            return "int32";
                        case "[object Uint8Array]":
                            return "uint8";
                        case "[object Uint16Array]":
                            return "uint16";
                        case "[object Uint32Array]":
                            return "uint32";
                        case "[object Uint8ClampedArray]":
                            return "uint8_clamped";
                        case "[object BigInt64Array]":
                            return "bigint64";
                        case "[object BigUint64Array]":
                            return "biguint64"
                    }
                    return Array.isArray(e) ? "array" : "generic"
                }(e), f = v[s]; f.length <= i + 1;) f.push(l(s, f.length - 1));
            return (0, f[i + 1])(e, t, r, n)
        }
    }, {
        "iota-array": 50,
        "is-buffer": 51
    }],
    55: [function(e, t, r) {
        "use strict";
        var f = Object.getOwnPropertySymbols,
            c = Object.prototype.hasOwnProperty,
            u = Object.prototype.propertyIsEnumerable;
        t.exports = function() {
            try {
                if (!Object.assign) return;
                var e = new String("abc");
                if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return;
                for (var t = {}, r = 0; r < 10; r++) t["_" + String.fromCharCode(r)] = r;
                if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(e) {
                        return t[e]
                    }).join("")) return;
                var n = {};
                return "abcdefghijklmnopqrst".split("").forEach(function(e) {
                    n[e] = e
                }), "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, n)).join("") ? void 0 : 1
            } catch (e) {
                return
            }
        }() ? Object.assign : function(e, t) {
            for (var r, n = function(e) {
                    if (null == e) throw new TypeError("Object.assign cannot be called with null or undefined");
                    return Object(e)
                }(e), i = 1; i < arguments.length; i++) {
                for (var o in r = Object(arguments[i])) c.call(r, o) && (n[o] = r[o]);
                if (f)
                    for (var a = f(r), s = 0; s < a.length; s++) u.call(r, a[s]) && (n[a[s]] = r[a[s]])
            }
            return n
        }
    }, {}],
    56: [function(e, t, r) {
        "use strict";
        var n = e("repeat-string");
        t.exports = function(e, t, r) {
            return n(r = void 0 !== r ? r + "" : " ", t) + e
        }
    }, {
        "repeat-string": 61
    }],
    57: [function(e, s, t) {
        ! function(a) {
            ! function() {
                ! function() {
                    var e, t, r, n, i, o;
                    "undefined" != typeof performance && null !== performance && performance.now ? s.exports = function() {
                        return performance.now()
                    } : null != a && a.hrtime ? (s.exports = function() {
                        return (e() - i) / 1e6
                    }, t = a.hrtime, n = (e = function() {
                        var e = t();
                        return 1e9 * e[0] + e[1]
                    })(), o = 1e9 * a.uptime(), i = n - o) : r = Date.now ? (s.exports = function() {
                        return Date.now() - r
                    }, Date.now()) : (s.exports = function() {
                        return (new Date).getTime() - r
                    }, (new Date).getTime())
                }.call(this)
            }.call(this)
        }.call(this, e("_process"))
    }, {
        _process: 58
    }],
    58: [function(e, t, r) {
        var n, i, t = t.exports = {};

        function o() {
            throw new Error("setTimeout has not been defined")
        }

        function a() {
            throw new Error("clearTimeout has not been defined")
        }

        function s(t) {
            if (n === setTimeout) return setTimeout(t, 0);
            if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
            try {
                return n(t, 0)
            } catch (e) {
                try {
                    return n.call(null, t, 0)
                } catch (e) {
                    return n.call(this, t, 0)
                }
            }
        }! function() {
            try {
                n = "function" == typeof setTimeout ? setTimeout : o
            } catch (e) {
                n = o
            }
            try {
                i = "function" == typeof clearTimeout ? clearTimeout : a
            } catch (e) {
                i = a
            }
        }();
        var f, c = [],
            u = !1,
            l = -1;

        function h() {
            u && f && (u = !1, f.length ? c = f.concat(c) : l = -1, c.length && g())
        }

        function g() {
            if (!u) {
                var e = s(h);
                u = !0;
                for (var t = c.length; t;) {
                    for (f = c, c = []; ++l < t;) f && f[l].run();
                    l = -1, t = c.length
                }
                f = null, u = !1,
                    function(t) {
                        if (i === clearTimeout) return clearTimeout(t);
                        if ((i === a || !i) && clearTimeout) return i = clearTimeout, clearTimeout(t);
                        try {
                            i(t)
                        } catch (e) {
                            try {
                                return i.call(null, t)
                            } catch (e) {
                                return i.call(this, t)
                            }
                        }
                    }(e)
            }
        }

        function p(e, t) {
            this.fun = e, this.array = t
        }

        function v() {}
        t.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (1 < arguments.length)
                for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
            c.push(new p(e, t)), 1 !== c.length || u || s(g)
        }, p.prototype.run = function() {
            this.fun.apply(null, this.array)
        }, t.title = "browser", t.browser = !0, t.env = {}, t.argv = [], t.version = "", t.versions = {}, t.on = v, t.addListener = v, t.once = v, t.off = v, t.removeListener = v, t.removeAllListeners = v, t.emit = v, t.prependListener = v, t.prependOnceListener = v, t.listeners = function(e) {
            return []
        }, t.binding = function(e) {
            throw new Error("process.binding is not supported")
        }, t.cwd = function() {
            return "/"
        }, t.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        }, t.umask = function() {
            return 0
        }
    }, {}],
    59: [function(e, t, r) {
        var n = e("inherits"),
            i = e("events").EventEmitter,
            o = e("right-now"),
            a = e("raf");

        function s(e) {
            if (!(this instanceof s)) return new s(e);
            this.running = !1, this.last = o(), this._frame = 0, this._tick = this.tick.bind(this), e && this.on("tick", e)
        }
        n(t.exports = s, i), s.prototype.start = function() {
            if (!this.running) return this.running = !0, this.last = o(), this._frame = a(this._tick), this
        }, s.prototype.stop = function() {
            return this.running = !1, 0 !== this._frame && a.cancel(this._frame), this._frame = 0, this
        }, s.prototype.tick = function() {
            this._frame = a(this._tick);
            var e = o(),
                t = e - this.last;
            this.emit("tick", t), this.last = e
        }
    }, {
        events: 18,
        inherits: 49,
        raf: 60,
        "right-now": 62
    }],
    60: [function(l, h, e) {
        ! function(u) {
            ! function() {
                for (var n, i, o, a = l("performance-now"), t = "undefined" == typeof window ? u : window, e = ["moz", "webkit"], r = "AnimationFrame", s = t["request" + r], f = t["cancel" + r] || t["cancelRequest" + r], c = 0; !s && c < e.length; c++) s = t[e[c] + "Request" + r], f = t[e[c] + "Cancel" + r] || t[e[c] + "CancelRequest" + r];
                s && f || (i = n = 0, o = [], s = function(e) {
                    var t, r;
                    return 0 === o.length && (t = a(), r = Math.max(0, 1e3 / 60 - (t - n)), n = r + t, setTimeout(function() {
                        for (var e = o.slice(0), t = o.length = 0; t < e.length; t++)
                            if (!e[t].cancelled) try {
                                e[t].callback(n)
                            } catch (e) {
                                setTimeout(function() {
                                    throw e
                                }, 0)
                            }
                    }, Math.round(r))), o.push({
                        handle: ++i,
                        callback: e,
                        cancelled: !1
                    }), i
                }, f = function(e) {
                    for (var t = 0; t < o.length; t++) o[t].handle === e && (o[t].cancelled = !0)
                }), h.exports = function(e) {
                    return s.call(t, e)
                }, h.exports.cancel = function() {
                    f.apply(t, arguments)
                }, h.exports.polyfill = function(e) {
                    (e = e || t).requestAnimationFrame = s, e.cancelAnimationFrame = f
                }
            }.call(this)
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "performance-now": 57
    }],
    61: [function(e, t, r) {
        "use strict";
        var n, i = "";
        t.exports = function(e, t) {
            if ("string" != typeof e) throw new TypeError("expected a string");
            if (1 === t) return e;
            if (2 === t) return e + e;
            var r = e.length * t;
            if (n !== e || void 0 === n) n = e, i = "";
            else if (i.length >= r) return i.substr(0, r);
            for (; r > i.length && 1 < t;) 1 & t && (i += e), t >>= 1, e += e;
            return i = (i += e).substr(0, r)
        }
    }, {}],
    62: [function(e, t, r) {
        ! function(e) {
            ! function() {
                t.exports = e.performance && e.performance.now ? function() {
                    return performance.now()
                } : Date.now || function() {
                    return +new Date
                }
            }.call(this)
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    63: [function(e, t, r) {
        ! function() {
            "use strict";
            var g = {
                not_string: /[^s]/,
                not_bool: /[^t]/,
                not_type: /[^T]/,
                not_primitive: /[^v]/,
                number: /[diefg]/,
                numeric_arg: /[bcdiefguxX]/,
                json: /[j]/,
                not_json: /[^j]/,
                text: /^[^\x25]+/,
                modulo: /^\x25{2}/,
                placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
                key: /^([a-z_][a-z_\d]*)/i,
                key_access: /^\.([a-z_][a-z_\d]*)/i,
                index_access: /^\[(\d+)\]/,
                sign: /^[+-]/
            };

            function p(e) {
                return function(e, t) {
                    var r, n, i, o, a, s, f, c, u = 1,
                        l = e.length,
                        h = "";
                    for (n = 0; n < l; n++)
                        if ("string" == typeof e[n]) h += e[n];
                        else if ("object" == typeof e[n]) {
                        if ((o = e[n]).keys)
                            for (r = t[u], i = 0; i < o.keys.length; i++) {
                                if (null == r) throw new Error(p('[sprintf] Cannot access property "%s" of undefined value "%s"', o.keys[i], o.keys[i - 1]));
                                r = r[o.keys[i]]
                            } else r = o.param_no ? t[o.param_no] : t[u++];
                        if (g.not_type.test(o.type) && g.not_primitive.test(o.type) && r instanceof Function && (r = r()), g.numeric_arg.test(o.type) && "number" != typeof r && isNaN(r)) throw new TypeError(p("[sprintf] expecting number but found %T", r));
                        switch (g.number.test(o.type) && (f = 0 <= r), o.type) {
                            case "b":
                                r = parseInt(r, 10).toString(2);
                                break;
                            case "c":
                                r = String.fromCharCode(parseInt(r, 10));
                                break;
                            case "d":
                            case "i":
                                r = parseInt(r, 10);
                                break;
                            case "j":
                                r = JSON.stringify(r, null, o.width ? parseInt(o.width) : 0);
                                break;
                            case "e":
                                r = o.precision ? parseFloat(r).toExponential(o.precision) : parseFloat(r).toExponential();
                                break;
                            case "f":
                                r = o.precision ? parseFloat(r).toFixed(o.precision) : parseFloat(r);
                                break;
                            case "g":
                                r = o.precision ? String(Number(r.toPrecision(o.precision))) : parseFloat(r);
                                break;
                            case "o":
                                r = (parseInt(r, 10) >>> 0).toString(8);
                                break;
                            case "s":
                                r = String(r), r = o.precision ? r.substring(0, o.precision) : r;
                                break;
                            case "t":
                                r = String(!!r), r = o.precision ? r.substring(0, o.precision) : r;
                                break;
                            case "T":
                                r = Object.prototype.toString.call(r).slice(8, -1).toLowerCase(), r = o.precision ? r.substring(0, o.precision) : r;
                                break;
                            case "u":
                                r = parseInt(r, 10) >>> 0;
                                break;
                            case "v":
                                r = r.valueOf(), r = o.precision ? r.substring(0, o.precision) : r;
                                break;
                            case "x":
                                r = (parseInt(r, 10) >>> 0).toString(16);
                                break;
                            case "X":
                                r = (parseInt(r, 10) >>> 0).toString(16).toUpperCase()
                        }
                        g.json.test(o.type) ? h += r : (!g.number.test(o.type) || f && !o.sign ? c = "" : (c = f ? "+" : "-", r = r.toString().replace(g.sign, "")), a = o.pad_char ? "0" === o.pad_char ? "0" : o.pad_char.charAt(1) : " ", s = o.width - (c + r).length, s = o.width && 0 < s ? a.repeat(s) : "", h += o.align ? c + r + s : "0" === a ? c + s + r : s + c + r)
                    }
                    return h
                }(function(e) {
                    if (f[e]) return f[e];
                    var t, r = e,
                        n = [],
                        i = 0;
                    for (; r;) {
                        if (null !== (t = g.text.exec(r))) n.push(t[0]);
                        else if (null !== (t = g.modulo.exec(r))) n.push("%");
                        else {
                            if (null === (t = g.placeholder.exec(r))) throw new SyntaxError("[sprintf] unexpected placeholder");
                            if (t[2]) {
                                i |= 1;
                                var o = [],
                                    a = t[2],
                                    s = [];
                                if (null === (s = g.key.exec(a))) throw new SyntaxError("[sprintf] failed to parse named argument key");
                                for (o.push(s[1]);
                                    "" !== (a = a.substring(s[0].length));)
                                    if (null !== (s = g.key_access.exec(a))) o.push(s[1]);
                                    else {
                                        if (null === (s = g.index_access.exec(a))) throw new SyntaxError("[sprintf] failed to parse named argument key");
                                        o.push(s[1])
                                    } t[2] = o
                            } else i |= 2;
                            if (3 === i) throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                            n.push({
                                placeholder: t[0],
                                param_no: t[1],
                                keys: t[2],
                                sign: t[3],
                                pad_char: t[4],
                                align: t[5],
                                width: t[6],
                                precision: t[7],
                                type: t[8]
                            })
                        }
                        r = r.substring(t[0].length)
                    }
                    return f[e] = n
                }(e), arguments)
            }

            function e(e, t) {
                return p.apply(null, [e].concat(t || []))
            }
            var f = Object.create(null);
            void 0 !== r && (r.sprintf = p, r.vsprintf = e), "undefined" != typeof window && (window.sprintf = p, window.vsprintf = e, "function" == typeof define && define.amd && define(function() {
                return {
                    sprintf: p,
                    vsprintf: e
                }
            }))
        }()
    }, {}],
    64: [function(T, e, R) {
        ! function(A) {
            ! function() {
                "use strict";
                var r = T("bit-twiddle"),
                    e = T("dup"),
                    n = T("buffer").Buffer;
                A.__TYPEDARRAY_POOL || (A.__TYPEDARRAY_POOL = {
                    UINT8: e([32, 0]),
                    UINT16: e([32, 0]),
                    UINT32: e([32, 0]),
                    BIGUINT64: e([32, 0]),
                    INT8: e([32, 0]),
                    INT16: e([32, 0]),
                    INT32: e([32, 0]),
                    BIGINT64: e([32, 0]),
                    FLOAT: e([32, 0]),
                    DOUBLE: e([32, 0]),
                    DATA: e([32, 0]),
                    UINT8C: e([32, 0]),
                    BUFFER: e([32, 0])
                });
                var t = "undefined" != typeof Uint8ClampedArray,
                    i = "undefined" != typeof BigUint64Array,
                    o = "undefined" != typeof BigInt64Array,
                    a = A.__TYPEDARRAY_POOL;
                a.UINT8C || (a.UINT8C = e([32, 0])), a.BIGUINT64 || (a.BIGUINT64 = e([32, 0])), a.BIGINT64 || (a.BIGINT64 = e([32, 0])), a.BUFFER || (a.BUFFER = e([32, 0]));
                var s = a.DATA,
                    f = a.BUFFER;

                function c(e) {
                    var t;
                    e && (t = e.length || e.byteLength, t = r.log2(t), s[t].push(e))
                }

                function u(e) {
                    var e = r.nextPow2(e),
                        t = r.log2(e),
                        t = s[t];
                    return 0 < t.length ? t.pop() : new ArrayBuffer(e)
                }

                function l(e) {
                    return new Uint8Array(u(e), 0, e)
                }

                function h(e) {
                    return new Uint16Array(u(2 * e), 0, e)
                }

                function g(e) {
                    return new Uint32Array(u(4 * e), 0, e)
                }

                function p(e) {
                    return new Int8Array(u(e), 0, e)
                }

                function v(e) {
                    return new Int16Array(u(2 * e), 0, e)
                }

                function d(e) {
                    return new Int32Array(u(4 * e), 0, e)
                }

                function y(e) {
                    return new Float32Array(u(4 * e), 0, e)
                }

                function _(e) {
                    return new Float64Array(u(8 * e), 0, e)
                }

                function x(e) {
                    return t ? new Uint8ClampedArray(u(e), 0, e) : l(e)
                }

                function m(e) {
                    return i ? new BigUint64Array(u(8 * e), 0, e) : null
                }

                function E(e) {
                    return o ? new BigInt64Array(u(8 * e), 0, e) : null
                }

                function b(e) {
                    return new DataView(u(e), 0, e)
                }

                function w(e) {
                    e = r.nextPow2(e);
                    var t = r.log2(e),
                        t = f[t];
                    return 0 < t.length ? t.pop() : new n(e)
                }
                R.free = function(e) {
                    var t;
                    n.isBuffer(e) ? f[r.log2(e.length)].push(e) : (e = "[object ArrayBuffer]" !== Object.prototype.toString.call(e) ? e.buffer : e) && (t = e.length || e.byteLength, t = 0 | r.log2(t), s[t].push(e))
                }, R.freeUint8 = R.freeUint16 = R.freeUint32 = R.freeBigUint64 = R.freeInt8 = R.freeInt16 = R.freeInt32 = R.freeBigInt64 = R.freeFloat32 = R.freeFloat = R.freeFloat64 = R.freeDouble = R.freeUint8Clamped = R.freeDataView = function(e) {
                    c(e.buffer)
                }, R.freeArrayBuffer = c, R.freeBuffer = function(e) {
                    f[r.log2(e.length)].push(e)
                }, R.malloc = function(e, t) {
                    if (void 0 === t || "arraybuffer" === t) return u(e);
                    switch (t) {
                        case "uint8":
                            return l(e);
                        case "uint16":
                            return h(e);
                        case "uint32":
                            return g(e);
                        case "int8":
                            return p(e);
                        case "int16":
                            return v(e);
                        case "int32":
                            return d(e);
                        case "float":
                        case "float32":
                            return y(e);
                        case "double":
                        case "float64":
                            return _(e);
                        case "uint8_clamped":
                            return x(e);
                        case "bigint64":
                            return E(e);
                        case "biguint64":
                            return m(e);
                        case "buffer":
                            return w(e);
                        case "data":
                        case "dataview":
                            return b(e);
                        default:
                            return null
                    }
                    return null
                }, R.mallocArrayBuffer = u, R.mallocUint8 = l, R.mallocUint16 = h, R.mallocUint32 = g, R.mallocInt8 = p, R.mallocInt16 = v, R.mallocInt32 = d, R.mallocFloat32 = R.mallocFloat = y, R.mallocFloat64 = R.mallocDouble = _, R.mallocUint8Clamped = x, R.mallocBigUint64 = m, R.mallocBigInt64 = E, R.mallocDataView = b, R.mallocBuffer = w, R.clearCache = function() {
                    for (var e = 0; e < 32; ++e) a.UINT8[e].length = 0, a.UINT16[e].length = 0, a.UINT32[e].length = 0, a.INT8[e].length = 0, a.INT16[e].length = 0, a.INT32[e].length = 0, a.FLOAT[e].length = 0, a.DOUBLE[e].length = 0, a.BIGUINT64[e].length = 0, a.BIGINT64[e].length = 0, a.UINT8C[e].length = 0, s[e].length = 0, f[e].length = 0
                }
            }.call(this)
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {
        "bit-twiddle": 9,
        buffer: 10,
        dup: 16
    }],
    65: [function(e, t, r) {
        "use strict";
        t.exports = function(e, t, r) {
            return 0 === e.length ? e : t ? (r || e.sort(t), function(e, t) {
                for (var r, n = 1, i = e.length, o = e[0], a = (e[0], 1); a < i; ++a) r = o, t(o = e[a], r) && (a !== n ? e[n++] = o : n++);
                return e.length = n, e
            }(e, t)) : (r || e.sort(), function(e) {
                for (var t = 1, r = e.length, n = e[0], i = e[0], o = 1; o < r; ++o, i = n) i = n, (n = e[o]) !== i && (o !== t ? e[t++] = n : t++);
                return e.length = t, e
            }(e))
        }
    }, {}],
    66: [function(e, x, t) {
        ! function() {
            "use strict";
            if ("undefined" == typeof ses || !ses.ok || ses.ok()) {
                "undefined" != typeof ses && (ses.weakMapPermitHostObjects = g);
                var t = !1;
                if ("function" == typeof WeakMap) {
                    var r = WeakMap;
                    if ("undefined" == typeof navigator || !/Firefox/.test(navigator.userAgent)) {
                        var e = new r,
                            n = Object.freeze({});
                        if (e.set(n, 1), 1 === e.get(n)) return x.exports = WeakMap;
                        t = !0
                    }
                }
                Object.prototype.hasOwnProperty;
                var i, o = Object.getOwnPropertyNames,
                    a = Object.defineProperty,
                    s = Object.isExtensible,
                    f = "weakmap:",
                    c = f + "ident:" + Math.random() + "___";
                "undefined" != typeof crypto && "function" == typeof crypto.getRandomValues && "function" == typeof ArrayBuffer && "function" == typeof Uint8Array && (n = new ArrayBuffer(25), n = new Uint8Array(n), crypto.getRandomValues(n), c = f + "rand:" + Array.prototype.map.call(n, function(e) {
                        return (e % 36).toString(36)
                    }).join("") + "___"), a(Object, "getOwnPropertyNames", {
                        value: function(e) {
                            return o(e).filter(p)
                        }
                    }), "getPropertyNames" in Object && (i = Object.getPropertyNames, a(Object, "getPropertyNames", {
                        value: function(e) {
                            return i(e).filter(p)
                        }
                    })),
                    function() {
                        var t = Object.freeze;
                        a(Object, "freeze", {
                            value: function(e) {
                                return v(e), t(e)
                            }
                        });
                        var r = Object.seal;
                        a(Object, "seal", {
                            value: function(e) {
                                return v(e), r(e)
                            }
                        });
                        var n = Object.preventExtensions;
                        a(Object, "preventExtensions", {
                            value: function(e) {
                                return v(e), n(e)
                            }
                        })
                    }();
                var u = !1,
                    l = 0,
                    h = function() {
                        this instanceof h || y();
                        var n = [],
                            i = [],
                            o = l++;
                        return Object.create(h.prototype, {
                            get___: {
                                value: d(function(e, t) {
                                    var r = v(e);
                                    return r ? o in r ? r[o] : t : 0 <= (e = n.indexOf(e)) ? i[e] : t
                                })
                            },
                            has___: {
                                value: d(function(e) {
                                    var t = v(e);
                                    return t ? o in t : 0 <= n.indexOf(e)
                                })
                            },
                            set___: {
                                value: d(function(e, t) {
                                    var r = v(e);
                                    return r ? r[o] = t : 0 <= (r = n.indexOf(e)) ? i[r] = t : (r = n.length, i[r] = t, n[r] = e), this
                                })
                            },
                            delete___: {
                                value: d(function(e) {
                                    var t = v(e);
                                    return t ? o in t && delete t[o] : !((t = n.indexOf(e)) < 0) && (e = n.length - 1, n[t] = void 0, i[t] = i[e], n[t] = n[e], n.length = e, i.length = e, !0)
                                })
                            }
                        })
                    };
                h.prototype = Object.create(Object.prototype, {
                    get: {
                        value: function(e, t) {
                            return this.get___(e, t)
                        },
                        writable: !0,
                        configurable: !0
                    },
                    has: {
                        value: function(e) {
                            return this.has___(e)
                        },
                        writable: !0,
                        configurable: !0
                    },
                    set: {
                        value: function(e, t) {
                            return this.set___(e, t)
                        },
                        writable: !0,
                        configurable: !0
                    },
                    delete: {
                        value: function(e) {
                            return this.delete___(e)
                        },
                        writable: !0,
                        configurable: !0
                    }
                }), "function" == typeof r ? (t && "undefined" != typeof Proxy && (Proxy = void 0), _.prototype = h.prototype, x.exports = _, Object.defineProperty(WeakMap.prototype, "constructor", {
                    value: WeakMap,
                    enumerable: !1,
                    configurable: !0,
                    writable: !0
                })) : ("undefined" != typeof Proxy && (Proxy = void 0), x.exports = h)
            }

            function g(e) {
                e.permitHostObjects___ && e.permitHostObjects___(g)
            }

            function p(e) {
                return !(e.substr(0, f.length) == f && "___" === e.substr(e.length - 3))
            }

            function v(e) {
                if (e !== Object(e)) throw new TypeError("Not an object: " + e);
                var t = e[c];
                if (t && t.key === e) return t;
                if (s(e)) {
                    t = {
                        key: e
                    };
                    try {
                        return a(e, c, {
                            value: t,
                            writable: !1,
                            enumerable: !1,
                            configurable: !1
                        }), t
                    } catch (e) {
                        return
                    }
                }
            }

            function d(e) {
                return e.prototype = null, Object.freeze(e)
            }

            function y() {
                u || "undefined" == typeof console || (u = !0, console.warn("WeakMap should be invoked as new WeakMap(), not WeakMap(). This will be an error in the future."))
            }

            function _() {
                this instanceof h || y();
                var e, n = new r,
                    i = void 0,
                    o = !1;
                return e = t ? function(e, t) {
                    return n.set(e, t), n.has(e) || (i = i || new h).set(e, t), this
                } : function(t, r) {
                    if (o) try {
                        n.set(t, r)
                    } catch (e) {
                        (i = i || new h).set___(t, r)
                    } else n.set(t, r);
                    return this
                }, Object.create(h.prototype, {
                    get___: {
                        value: d(function(e, t) {
                            return i ? n.has(e) ? n.get(e) : i.get___(e, t) : n.get(e, t)
                        })
                    },
                    has___: {
                        value: d(function(e) {
                            return n.has(e) || !!i && i.has___(e)
                        })
                    },
                    set___: {
                        value: d(e)
                    },
                    delete___: {
                        value: d(function(e) {
                            var t = !!n.delete(e);
                            return i && i.delete___(e) || t
                        })
                    },
                    permitHostObjects___: {
                        value: d(function(e) {
                            if (e !== g) throw new Error("bogus call to permitHostObjects___");
                            o = !0
                        })
                    }
                })
            }
        }()
    }, {}],
    67: [function(e, t, r) {
        var n = e("./hidden-store.js");
        t.exports = function() {
            var r = {};
            return function(e) {
                if (("object" != typeof e || null === e) && "function" != typeof e) throw new Error("Weakmap-shim: Key must be object");
                var t = e.valueOf(r);
                return t && t.identity === r ? t : n(e, r)
            }
        }
    }, {
        "./hidden-store.js": 68
    }],
    68: [function(e, t, r) {
        t.exports = function(e, t) {
            var r = {
                    identity: t
                },
                n = e.valueOf;
            return Object.defineProperty(e, "valueOf", {
                value: function(e) {
                    return e !== t ? n.apply(this, arguments) : r
                },
                writable: !0
            }), r
        }
    }, {}],
    69: [function(e, t, r) {
        var n = e("./create-store.js");
        t.exports = function() {
            var r = n();
            return {
                get: function(e, t) {
                    e = r(e);
                    return e.hasOwnProperty("value") ? e.value : t
                },
                set: function(e, t) {
                    return r(e).value = t, this
                },
                has: function(e) {
                    return "value" in r(e)
                },
                delete: function(e) {
                    return delete r(e).value
                }
            }
        }
    }, {
        "./create-store.js": 67
    }],
    70: [function(e, t, r) {
        var n = e("get-canvas-context");
        t.exports = function(e) {
            return n("webgl", e)
        }
    }, {
        "get-canvas-context": 19
    }]
}, {}, [1]);