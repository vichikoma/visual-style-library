/* ============================================================
   视觉风格库 · 样例页公共脚本
   FX.rng / FX.particles / FX.rain / FX.stars / FX.city / FX.crowd / FX.split
   所有生成器读取元素上的 data-* 参数，页面里无需写循环。
   ============================================================ */
window.FX = (function () {
  function rng(seed) {
    var a = seed | 0 || 1;
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  /* 发光粒子：data-seed data-n data-c="#a,#b" data-size="0.15" */
  function particles(el) {
    var d = el.dataset, R = rng(+d.seed || 5), n = +d.n || 40,
        cols = (d.c || '#38e8ff').split(','), base = +(d.size || 0.15), s = '';
    for (var i = 0; i < n; i++) {
      var sz = (base + R() * base * 3).toFixed(2), c = cols[(R() * cols.length) | 0];
      s += '<i style="left:' + (R() * 100).toFixed(1) + '%;top:' + (R() * 100).toFixed(1) +
           '%;width:' + sz + 'cqw;height:' + sz + 'cqw;background:' + c +
           ';box-shadow:0 0 ' + (sz * 3).toFixed(2) + 'cqw ' + c +
           ';animation-delay:' + (-R() * 4).toFixed(2) + 's;animation-duration:' + (2 + R() * 4).toFixed(2) + 's"></i>';
    }
    el.innerHTML = s;
  }

  /* 星点（无发光，尺寸更小）：data-seed data-n data-c */
  function stars(el) {
    var d = el.dataset, R = rng(+d.seed || 3), n = +d.n || 120,
        cols = (d.c || '#ffffff').split(','), s = '';
    for (var i = 0; i < n; i++) {
      var sz = (0.05 + R() * 0.16).toFixed(2), c = cols[(R() * cols.length) | 0];
      s += '<i style="left:' + (R() * 100).toFixed(1) + '%;top:' + (R() * 100).toFixed(1) +
           '%;width:' + sz + 'cqw;height:' + sz + 'cqw;background:' + c + ';opacity:' + (.35 + R() * .65).toFixed(2) +
           ';box-shadow:0 0 ' + (sz * 4).toFixed(2) + 'cqw ' + c +
           ';animation-delay:' + (-R() * 5).toFixed(2) + 's;animation-duration:' + (3 + R() * 5).toFixed(2) + 's"></i>';
    }
    el.innerHTML = s;
  }

  /* 雨丝：data-seed data-n data-color */
  function rain(el) {
    var d = el.dataset, R = rng(+d.seed || 8), n = +d.n || 70, c = d.color || 'rgba(170,215,255,.55)', s = '';
    for (var i = 0; i < n; i++)
      s += '<i style="left:' + (R() * 100).toFixed(1) + '%;top:0;height:' + (2 + R() * 5).toFixed(1) +
           'cqw;background:linear-gradient(transparent,' + c + ');animation-duration:' + (.55 + R() * .6).toFixed(2) +
           's;animation-delay:' + (-R() * 2).toFixed(2) + 's;opacity:' + (.3 + R() * .7).toFixed(2) + '"></i>';
    el.innerHTML = s;
  }

  /* 像素城市剪影：data-seed data-fill data-win="#a,#b" data-wp=".2" data-minh data-maxh data-minw data-maxw */
  function city(svg) {
    var d = svg.dataset, R = rng(+d.seed || 1), W = +(d.w || 1600), H = +(d.h || 900), cell = +(d.cell || 10);
    var minW = +d.minw || 60, maxW = +d.maxw || 160, minH = +d.minh || 200, maxH = +d.maxh || 520;
    var wins = (d.win || '#38e8ff').split(','), wp = +(d.wp || .2), fill = d.fill || '#0b0a1c', s = '', x = -20;
    while (x < W) {
      var w = Math.round((minW + R() * (maxW - minW)) / cell) * cell,
          h = Math.round((minH + R() * (maxH - minH)) / cell) * cell, y = H - h;
      if (R() < .35) {
        var ax = x + Math.round(w / 2 / cell) * cell;
        s += '<rect x="' + ax + '" y="' + (y - cell * 5) + '" width="' + cell + '" height="' + cell * 5 + '" fill="' + fill + '"/>';
        if (R() < .6) s += '<rect x="' + ax + '" y="' + (y - cell * 6) + '" width="' + cell + '" height="' + cell + '" fill="#ff2e3b"/>';
      }
      if (R() < .3) s += '<rect x="' + (x + cell) + '" y="' + (y - cell * 2) + '" width="' + (w - cell * 2) + '" height="' + cell * 2 + '" fill="' + fill + '"/>';
      s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + fill + '"/>';
      for (var wy = y + cell * 2; wy < H - cell; wy += cell * 2) {
        for (var wx = x + cell; wx < x + w - cell; wx += cell * 2) {
          if (R() < wp) s += '<rect x="' + wx + '" y="' + wy + '" width="' + cell + '" height="' + cell + '" fill="' +
            wins[(R() * wins.length) | 0] + '" opacity="' + (.45 + R() * .55).toFixed(2) + '"/>';
        }
      }
      x += w + (R() < .3 ? cell * 2 : 0);
    }
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('preserveAspectRatio', 'xMidYMax slice');
    svg.setAttribute('shape-rendering', 'crispEdges');
    svg.innerHTML = s;
  }

  /* 人群剪影：data-seed data-rows="13,18,26" data-crowd="#2b1240,#160a23,#040208" data-torch="0.2" */
  function crowd(svg) {
    var d = svg.dataset, R = rng(+d.seed || 7), W = +(d.w || 1600);
    var radii = (d.rows || '13,18,26').split(',').map(Number);
    var cols = (d.crowd || '#2b1240,#160a23,#040208').split(',');
    var torchP = d.torch === undefined ? .2 : +d.torch;
    var s = '<defs><radialGradient id="fxTorch"><stop offset="0" stop-color="#ffb347" stop-opacity=".75"/>' +
            '<stop offset=".4" stop-color="#ff5a1f" stop-opacity=".3"/><stop offset="1" stop-color="#ff2e3b" stop-opacity="0"/></radialGradient></defs>';
    var ys = [150, 206, 270], base = +(d.y || 150), step = +(d.step || 56);
    radii.forEach(function (r0, ri) {
      var y = base + step * ri, c = cols[ri] || cols[cols.length - 1];
      for (var x = -20; x < W + 20; x += r0 * 2.4) {
        var r = r0 * (.85 + R() * .3), cx = x + (R() - .5) * r0, cy = y + (R() - .5) * r0 * .6, arm = '';
        if (R() < (ri === radii.length - 1 ? torchP * .65 : torchP)) {
          var ax = cx + (R() < .5 ? -1 : 1) * r * 1.3, tx = ax + (R() - .5) * r * 1.4, ty = cy - r * 3.4;
          arm = '<path d="M' + ax.toFixed(1) + ',' + (cy + r * 1.8).toFixed(1) + ' L' + tx.toFixed(1) + ',' + ty.toFixed(1) +
                '" stroke="' + c + '" stroke-width="' + (r * .55).toFixed(1) + '" stroke-linecap="round"/>';
          if (R() < .55) {
            var k = (r / 16).toFixed(2);
            arm += '<g transform="translate(' + tx.toFixed(1) + ',' + (ty - r * .2).toFixed(1) + ') scale(' + k + ')">' +
                   '<circle r="70" fill="url(#fxTorch)"/><rect x="-3" y="0" width="6" height="30" fill="#3a2010"/>' +
                   '<g class="flame" style="animation-delay:' + (-R()).toFixed(2) + 's">' +
                   '<path d="M0,4 C-15,-6 -11,-24 -2,-44 C0,-30 9,-28 11,-15 C15,-4 9,4 0,4Z" fill="#ff6a1f"/>' +
                   '<path d="M0,3 C-6,-4 -4,-15 0,-24 C2,-15 6,-11 5,-4 C4,1 2,3 0,3Z" fill="#ffe08a"/></g></g>';
          }
        }
        s += arm + '<g fill="' + c + '"><circle cx="' + cx.toFixed(1) + '" cy="' + cy.toFixed(1) + '" r="' + r.toFixed(1) + '"/>' +
             '<ellipse cx="' + cx.toFixed(1) + '" cy="' + (cy + r * 2.4).toFixed(1) + '" rx="' + (r * 1.9).toFixed(1) +
             '" ry="' + (r * 1.3).toFixed(1) + '"/><rect x="' + (cx - r * 1.9).toFixed(1) + '" y="' + (cy + r * 2.4).toFixed(1) +
             '" width="' + (r * 3.8).toFixed(1) + '" height="200"/></g>';
      }
    });
    svg.setAttribute('viewBox', '0 0 ' + W + ' 330');
    svg.setAttribute('preserveAspectRatio', 'xMidYMax slice');
    svg.innerHTML = s;
  }

  /* 逐字拆分：el.textContent 拆成 <span class="ch">，用于动态排版 */
  function split(el) {
    var t = el.textContent, out = '';
    for (var i = 0; i < t.length; i++)
      out += '<span class="ch" style="--i:' + i + '">' + (t[i] === ' ' ? '&nbsp;' : t[i]) + '</span>';
    el.innerHTML = out;
    el.style.setProperty('--n', t.length);
    return el.querySelectorAll('.ch');
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.fx-part').forEach(particles);
    document.querySelectorAll('.fx-star').forEach(stars);
    document.querySelectorAll('.fx-rain').forEach(rain);
    document.querySelectorAll('svg.fx-city:not([data-flat])').forEach(city);
    document.querySelectorAll('svg.fx-crowd').forEach(crowd);
    document.querySelectorAll('[data-split]').forEach(split);
  });

  return { rng: rng, particles: particles, stars: stars, rain: rain, city: city, crowd: crowd, split: split };
})();
