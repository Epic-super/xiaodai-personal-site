// 公共组件:js/components.js (重构版 v2)
// 注入统一导航栏与页脚:当前页高亮 / 汉堡菜单 / 明暗主题(localStorage 持久化,默认跟随系统)

(function () {
  'use strict';

  function getSiteRoot() {
    var scripts = document.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
      var src = scripts[i].getAttribute('src') || '';
      if (/components\.js$/.test(src)) {
        var idx = src.lastIndexOf('js/');
        return idx > -1 ? src.substring(0, idx) : '';
      }
    }
    return '';
  }

  var root = getSiteRoot();

  var navItems = [
    { href: 'index.html',    label: '首页' },
    { href: 'about.html',    label: '关于我' },
    { href: 'notes.html',    label: '学习笔记' },
    { href: 'projects.html', label: '项目展示' },
    { href: 'blog.html',     label: '博客随笔' },
    { href: 'tools.html',    label: '工具箱' },
    { href: 'contact.html',  label: '联系我' }
  ];

  var currentPage = (window.location.pathname.split('/').pop() || 'index.html');

  function renderHeader() {
    var navHtml = navItems.map(function (item) {
      var active = (item.href === currentPage) ? ' class="active" aria-current="page"' : '';
      return '<li><a href="' + root + item.href + '"' + active + '>' + item.label + '</a></li>';
    }).join('');

    var header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML =
      '<div class="header-inner">' +
        '<a href="' + root + 'index.html" class="site-logo">' +
          '<span class="logo-dot">待</span>小待的个人藏宝库' +
        '</a>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="切换导航菜单" aria-expanded="false">' +
          '<span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span><span class="nav-toggle-bar"></span>' +
        '</button>' +
        '<nav class="main-nav" id="main-nav" aria-label="主导航"><ul>' + navHtml + '</ul></nav>' +
        '<button class="theme-toggle" id="theme-toggle" aria-label="切换明暗主题">🌙</button>' +
      '</div>';
    document.body.insertBefore(header, document.body.firstChild);

    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('main-nav');
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  function renderFooter() {
    var year = new Date().getFullYear();
    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML =
      '<p>© ' + year + ' 小待的个人藏宝库 · <a href="' + root + 'about.html">关于我</a> · <a href="' + root + 'contact.html">联系我</a></p>' +
      '<p style="margin-top:4px;font-size:.8rem">记录学习 · 分享生活 · 展示作品</p>';
    document.body.appendChild(footer);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    var btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  function initTheme() {
    var stored = null;
    try { stored = localStorage.getItem('theme'); } catch (e) { /* ignore */ }
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(stored || (prefersDark ? 'dark' : 'light'));

    var btn = document.getElementById('theme-toggle');
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }
    });

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        try { if (!localStorage.getItem('theme')) applyTheme(e.matches ? 'dark' : 'light'); } catch (err) { /* ignore */ }
      });
    }
  }

  function init() {
    renderHeader();
    renderFooter();
    initTheme();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
