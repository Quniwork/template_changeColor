const { ref, computed, onMounted } = Vue;

const app = Vue.createApp({
  setup() {
    const activeTab = ref('Casino'); // 預設為 'Casino' 分類
    const games = ref([]);
    const hotGames = ref([]);

    // 遊戲清單過濾
    const filteredGames = computed(() => {
      return games.value.filter(game => game.category === activeTab.value);
    });

    // 載入資料
    const fetchGames = async () => {
      try {
        const response = await fetch("js/data.json"); // 請求 data.json 文件
        const data = await response.json();
        games.value = data.games;
        hotGames.value = data.hotgames;
      } catch (error) {
        console.error("Failed to load games data:", error);
      }
    };

    onMounted(() => {
      fetchGames();
      fetchHotGames();
    });

    return {
      activeTab,
      filteredGames,
      games,
      hotGames
    };
  }
});

app.mount("#page-layout");





// ===========================================
// !登入表單效果, 點擊或有值則隱藏ele-login-placeholder
// ===========================================
document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('.ele-login-input');

  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      const placeholder = input.nextElementSibling;
      placeholder.style.opacity = 0.5;
    });

    input.addEventListener('blur', function() {
      const placeholder = input.nextElementSibling;
      if (input.value.trim() === '') {
        placeholder.style.opacity = 1;
      }
    });

    input.addEventListener('input', function() {
      const placeholder = input.nextElementSibling;
      if (input.value.trim() !== '') {
        placeholder.style.opacity = 0;
      } else {
        placeholder.style.opacity = 0.5;
      }
    });

    // 初始化時檢查輸入字段是否有值
    const placeholder = input.nextElementSibling;
    if (input.value.trim() !== '') {
      placeholder.style.opacity = 0;
    } else {
      placeholder.style.opacity = 1;
    }
  });
});