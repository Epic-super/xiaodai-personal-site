// 页面脚本:js/script.js (重构版 v2)
// 滚动出现动画 / 博客分类过滤 / 工具箱(随机数、待办、单词速记)

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  /* ---------- 滚动出现动画 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 博客分类过滤 ---------- */
  var catBtns = document.querySelectorAll('#blog-cats button');
  var posts = document.querySelectorAll('.blog-post');
  if (catBtns.length && posts.length) {
    catBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        catBtns.forEach(function (b) { b.classList.remove('on'); });
        btn.classList.add('on');
        var c = btn.dataset.cat;
        posts.forEach(function (p) {
          p.style.display = (c === 'all' || p.dataset.cat === c) ? '' : 'none';
        });
      });
    });
  }

  /* ---------- 工具:随机数生成器 ---------- */
  var rndBtn = document.getElementById('rnd-btn');
  if (rndBtn) {
    var rndMin = document.getElementById('rnd-min');
    var rndMax = document.getElementById('rnd-max');
    var rndOut = document.getElementById('rnd-out');
    function doRandom() {
      var min = Math.ceil(parseFloat(rndMin.value) || 0);
      var max = Math.floor(parseFloat(rndMax.value) || 100);
      if (min > max) { var t = min; min = max; max = t; }
      rndOut.textContent = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    rndBtn.addEventListener('click', doRandom);
  }

  /* ---------- 工具:待办事项( localStorage ) ---------- */
  var todoInput = document.getElementById('todo-input');
  var todoAdd = document.getElementById('todo-add');
  var todoList = document.getElementById('todo-list');
  if (todoAdd && todoList) {
    var KEY = 'rebuild-todos-v1';
    function loadTodos() {
      try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; }
    }
    function saveTodos(list) {
      try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
    }
    function renderTodos() {
      var list = loadTodos();
      todoList.innerHTML = '';
      list.forEach(function (item, i) {
        var li = document.createElement('li');
        if (item.done) li.className = 'done';
        li.innerHTML =
          '<span>' + item.text + '</span>' +
          '<span class="todo-actions">' +
            '<button class="ok" data-i="' + i + '">' + (item.done ? '↩' : '✓') + '</button>' +
            '<button class="del" data-i="' + i + '">✕</button>' +
          '</span>';
        todoList.appendChild(li);
      });
    }
    function addTodo() {
      var text = todoInput.value.trim();
      if (!text) return;
      var list = loadTodos();
      list.push({ text: text, done: false });
      saveTodos(list);
      todoInput.value = '';
      renderTodos();
    }
    todoAdd.addEventListener('click', addTodo);
    todoInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') addTodo(); });
    todoList.addEventListener('click', function (e) {
      var btn = e.target.closest('button');
      if (!btn) return;
      var list = loadTodos();
      var i = parseInt(btn.dataset.i, 10);
      if (btn.classList.contains('del')) list.splice(i, 1);
      if (btn.classList.contains('ok')) list[i].done = !list[i].done;
      saveTodos(list);
      renderTodos();
    });
    renderTodos();
  }

  /* ---------- 工具:六级单词速记(卡片) ---------- */
  var card = document.getElementById('fc-card');
  var fcNext = document.getElementById('fc-next');
  var fcPrev = document.getElementById('fc-prev');
  var fcFlip = document.getElementById('fc-flip');
  if (card) {
    var words = [
      { w: 'abandon', m: 'v. 放弃；抛弃' },
      { w: 'capacity', m: 'n. 能力；容量' },
      { w: 'diverse', m: 'adj. 多样的' },
      { w: 'essential', m: 'adj. 必要的；本质的' },
      { w: 'fundamental', m: 'adj. 基本的' },
      { w: 'generate', m: 'v. 产生；生成' },
      { w: 'inevitable', m: 'adj. 不可避免的' },
      { w: 'justify', m: 'v. 证明…正当' },
      { w: 'maintain', m: 'v. 维持；保养' },
      { w: 'overwhelm', m: 'v. 压倒；使不知所措' },
      { w: 'perspective', m: 'n. 观点；透视' },
      { w: 'significant', m: 'adj. 重要的；显著的' }
    ];
    var idx = 0, flipped = false;
    function render() {
      var item = words[idx];
      card.innerHTML = flipped
        ? item.m + '<span class="hint">点击卡片翻回单词</span>'
        : item.w + '<span class="hint">点击卡片查看释义 · ' + (idx + 1) + ' / ' + words.length + '</span>';
    }
    card.addEventListener('click', function () { flipped = !flipped; render(); });
    fcNext.addEventListener('click', function () { idx = (idx + 1) % words.length; flipped = false; render(); });
    fcPrev.addEventListener('click', function () { idx = (idx - 1 + words.length) % words.length; flipped = false; render(); });
    render();
  }
});
