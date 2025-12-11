// search.js
Page({
  data: {
    searchText: '',
    historyList: []
  },

  // 页面加载时调用
  onLoad: function () {
    // 从本地存储获取历史搜索记录
    const historyList = wx.getStorageSync('searchHistory') || [];
    this.setData({
      historyList: historyList
    });
  },

  // 返回首页
  onBackTap: function () {
    wx.navigateBack();
  },

  // 输入框内容变化
  onInputChange: function (e) {
    this.setData({
      searchText: e.detail.value
    });
  },

  // 搜索功能
  onSearchTap: function () {
    const { searchText, historyList } = this.data;
    
    if (searchText.trim()) {
      // 保存搜索记录到本地存储
      let newHistoryList = [searchText, ...historyList.filter(item => item !== searchText)];
      // 限制历史记录数量为10条
      if (newHistoryList.length > 10) {
        newHistoryList = newHistoryList.slice(0, 10);
      }
      wx.setStorageSync('searchHistory', newHistoryList);
      
      // 模拟搜索请求，然后返回首页
      console.log('搜索内容：', searchText);
      
      // 返回首页
      wx.navigateBack();
    }
  },

  // 点击历史记录进行搜索
  onHistoryTap: function (e) {
    const searchText = e.currentTarget.dataset.text;
    this.setData({
      searchText: searchText
    });
    // 执行搜索
    this.onSearchTap();
  },

  // 清除历史记录
  onClearHistory: function () {
    // 清空本地存储的历史记录
    wx.setStorageSync('searchHistory', []);
    // 更新页面数据
    this.setData({
      historyList: []
    });
  }
})