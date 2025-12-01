/**
 * 智流引擎 - 主交互脚本
 * 包含所有页面交互逻辑
 */

// ================================
// DOM 元素获取
// ================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.getElementById('navbar');
const backToTopBtn = document.getElementById('backToTop');

// ================================
// 1. 移动端菜单切换
// ================================
function initMobileMenu() {
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');

        // 切换汉堡图标为关闭图标
        const icon = mobileMenuBtn.querySelector('svg');
        if (mobileMenu.classList.contains('hidden')) {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        } else {
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
        }
    });

    // 点击移动端菜单链接后自动收起
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('svg');
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        });
    });
}

// ================================
// 2. Tab 切换功能 (知识体系部分)
// ================================
function switchTab(type) {
    const btnRegular = document.getElementById('btn-regular');
    const btnGraph = document.getElementById('btn-graph');
    const contentRegular = document.getElementById('content-regular');
    const contentGraph = document.getElementById('content-graph');
    const imgPlaceholder = document.getElementById('img-placeholder');

    if (!btnRegular || !btnGraph) return;

    if (type === 'regular') {
        // 激活 Regular 按钮样式
        btnRegular.className = 'px-4 py-2 rounded-md text-sm font-medium bg-white text-blue-600 shadow-sm transition-all';
        btnGraph.className = 'px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 transition-all';

        // 切换内容
        contentRegular.classList.add('active');
        contentGraph.classList.remove('active');

        // 更新图片占位符
        if (imgPlaceholder) {
            imgPlaceholder.innerHTML = `
                <svg class="w-20 h-20 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span class="text-gray-400 font-medium">知识库列表视图</span>
            `;
        }
    } else {
        // 激活 Graph 按钮样式
        btnGraph.className = 'px-4 py-2 rounded-md text-sm font-medium bg-white text-blue-600 shadow-sm transition-all';
        btnRegular.className = 'px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700 transition-all';

        // 切换内容
        contentGraph.classList.add('active');
        contentRegular.classList.remove('active');

        // 更新图片占位符
        if (imgPlaceholder) {
            imgPlaceholder.innerHTML = `
                <svg class="w-20 h-20 text-green-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <span class="text-gray-400 font-medium">知识图谱可视化视图</span>
            `;
        }
    }
}

// 将 switchTab 挂载到 window 对象供 HTML 调用
window.switchTab = switchTab;

// ================================
// 3. 滚动动画 (Intersection Observer)
// ================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // 元素出现 10% 时触发
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // 动画只播放一次
            }
        });
    }, observerOptions);

    // 观察所有带 .reveal 类的元素
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
}

// ================================
// 4. 导航栏滚动效果
// ================================
function initNavbarScroll() {
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });
}

// ================================
// 5. 回到顶部按钮
// ================================
function initBackToTop() {
    if (!backToTopBtn) return;

    // 监听滚动，控制按钮显示/隐藏
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
        } else {
            backToTopBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
        }
    });
}

// 回到顶部函数
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 将 scrollToTop 挂载到 window 对象供 HTML 调用
window.scrollToTop = scrollToTop;

// ================================
// 6. 平滑滚动到锚点
// ================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ================================
// 7. 统计数字动画 (可选增强)
// ================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 动画持续时间 (ms)
        const step = target / (duration / 16); // 每帧增加的值
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        // 使用 Intersection Observer 触发动画
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// ================================
// 8. 打字机效果 (可选增强)
// ================================
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// ================================
// 初始化所有功能
// ================================
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initScrollAnimations();
    initNavbarScroll();
    initBackToTop();
    initSmoothScroll();

    console.log('智流引擎 - 页面初始化完成');
});

// ================================
// 导出函数供外部使用 (如果需要模块化)
// ================================
window.ZhiLiu = {
    switchTab,
    scrollToTop,
    typeWriter,
    initCounterAnimation
};
