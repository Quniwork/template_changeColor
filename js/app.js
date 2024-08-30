const { ref, computed, onMounted } = Vue;

const app = Vue.createApp({
  setup() {
    // 之前的 setup 內容
    const imgHover = ref(null);
    const customLinks = ref([]);
    const footerLinks = ref([]);
    const navItems = ref([]);
    const activeClass = ref("");
    const games = ref([]);
    const activeTab = ref('Casino');

    // 计算属性，用于根据 activeTab 筛选游戏
    const filteredGames = computed(() => {
      return games.value.filter(game => game.category === activeTab.value);
    });

    // 数据加载函数
    const fetchData = async () => {
      try {
        const response = await fetch("js/data.json");
        const data = await response.json();
        customLinks.value = data.customLinks;
        footerLinks.value = data.footerLinks;
        navItems.value = data.navItems;
        games.value = data.games;
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    // 页面加载时执行数据加载
    onMounted(() => {
      activeClass.value = document.body.classList.contains('first') ? 'first' : '';
      fetchData(); // 加载所有数据
    });

    // 用于判断当前激活状态的函数
    const isActive = (itemClass) => itemClass === activeClass.value;

    // 新增的表单处理逻辑
    const username = ref('');
    const password = ref('');
    const isPasswordVisible = ref(false);

    const usernamePlaceholderOpacity = ref(1);
    const passwordPlaceholderOpacity = ref(1);

    const handleFocus = (field) => {
      if (field === 'username' && username.value.trim() === '') {
        usernamePlaceholderOpacity.value = 0.5;
      }
      if (field === 'password' && password.value.trim() === '') {
        passwordPlaceholderOpacity.value = 0.5;
      }
    };

    const handleBlur = (field) => {
      if (field === 'username') {
        usernamePlaceholderOpacity.value = username.value.trim() === '' ? 1 : 0;
      }
      if (field === 'password') {
        passwordPlaceholderOpacity.value = password.value.trim() === '' ? 1 : 0;
      }
    };

    const handleInput = (field) => {
      if (field === 'username') {
        usernamePlaceholderOpacity.value = username.value.trim() !== '' ? 0 : 0.5;
      }
      if (field === 'password') {
        passwordPlaceholderOpacity.value = password.value.trim() !== '' ? 0 : 0.5;
      }
    };

    const togglePasswordVisibility = () => {
      isPasswordVisible.value = !isPasswordVisible.value;
    };

    const passwordType = computed(() => (isPasswordVisible.value ? 'text' : 'password'));

    return {
      imgHover,
      customLinks,
      footerLinks,
      navItems,
      activeTab,
      isActive,
      games,
      filteredGames,
      username,
      password,
      isPasswordVisible,
      usernamePlaceholderOpacity,
      passwordPlaceholderOpacity,
      handleFocus,
      handleBlur,
      handleInput,
      togglePasswordVisibility,
      passwordType,
    };
  }
});

app.mount('#page-layout');
