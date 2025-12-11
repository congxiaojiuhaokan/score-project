//index.js
Page({
  data: {
    text: '首页',
    activeSort: 'newest', // 默认显示最新
    companyList: [],
    selectedCity: '' // 选中的城市
  },
  
  // 页面加载时调用
  onLoad: function() {
    // 从本地存储获取选中的城市
    const selectedCity = wx.getStorageSync('selectedCity') || '';
    this.setData({
      selectedCity: selectedCity
    });
    
    // 生成大量公司数据，模拟虚拟列表场景
    const companyList = [];
    const companyNames = [
      '阿里巴巴集团', '腾讯科技有限公司', '字节跳动科技有限公司', '美团点评', '百度在线网络技术有限公司',
      '京东集团', '网易公司', '拼多多', '小米科技有限责任公司', '华为技术有限公司',
      '滴滴出行', '新浪公司', '搜狐公司', '携程旅行网', '去哪儿网',
      '饿了么', '优酷视频', '爱奇艺', '哔哩哔哩', '快手科技',
      '小红书', '微博', '知乎', '豆瓣', '抖音短视频',
      '微信支付', '支付宝', '云闪付', '苏宁易购', '唯品会',
      '贝壳找房', '链家网', '自如网', '我爱我家', '麦田房产',
      '哈啰出行', '高德地图', '百度地图', '腾讯地图', '滴滴打车',
      '优步中国', '曹操出行', '首汽约车', '神州专车', 'T3出行',
      '菜鸟网络', '顺丰速运', '中通快递', '圆通速递', '申通快递',
      '韵达快递', '百世快递', '京东物流', '中国邮政', 'EMS'
    ];
    
    const tagsList = [
      ['互联网', '电商', '科技巨头'],
      ['互联网', '社交', '游戏'],
      ['互联网', '短视频', '内容'],
      ['互联网', '生活服务', '外卖'],
      ['互联网', '搜索引擎', 'AI'],
      ['互联网', '电商', '物流'],
      ['互联网', '游戏', '邮箱'],
      ['互联网', '电商', '社交'],
      ['互联网', '手机', '硬件'],
      ['互联网', '通信', '科技巨头']
    ];
    
    for (let i = 1; i <= 50; i++) {
      const randomName = companyNames[Math.floor(Math.random() * companyNames.length)];
      const randomTags = tagsList[Math.floor(Math.random() * tagsList.length)];
      
      // 生成随机描述文字（包含长文本，用于测试三行省略）
      const descriptions = [
        '这是一家领先的互联网科技公司，致力于为用户提供优质的产品和服务。公司成立于2000年，拥有超过10000名员工，业务覆盖全球多个国家和地区。这是一家领先的互联网科技公司，致力于为用户提供优质的产品和服务。公司成立于2000年，拥有超过10000名员工，业务覆盖全球多个国家和地区',
        '该公司专注于电商领域，通过创新的商业模式和技术手段，不断提升用户体验。公司的核心业务包括在线零售、物流服务和金融科技等。',
        '作为一家科技巨头，该公司在人工智能、云计算、大数据等领域拥有领先的技术优势。公司的使命是用科技改变生活，让世界变得更加美好。',
        '这是一家专注于社交媒体的公司，通过不断创新和优化，吸引了大量用户。公司的产品包括社交平台、短视频应用和直播服务等。',
        '该公司在游戏行业有着深厚的积累和丰富的经验，开发了多款备受欢迎的游戏产品。公司的游戏业务覆盖了多个平台，包括PC、移动端和主机等。'
      ];
      
      // 生成随机地区
      const regions = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '重庆', '南京'];
      
      // 生成随机用户信息
      const users = [
        { name: '张三', avatar: 'https://picsum.photos/id/1/40/40' },
        { name: '李四', avatar: 'https://picsum.photos/id/2/40/40' },
        { name: '王五', avatar: 'https://picsum.photos/id/3/40/40' },
        { name: '赵六', avatar: 'https://picsum.photos/id/4/40/40' },
        { name: '孙七', avatar: 'https://picsum.photos/id/5/40/40' }
      ];
      
      const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
      const randomRegion = regions[Math.floor(Math.random() * regions.length)];
      const randomUser = users[Math.floor(Math.random() * users.length)];
      
      companyList.push({
        id: i,
        name: `${randomName} (${i})`,
        region: randomRegion,
        description: randomDescription,
        tags: randomTags,
        user: randomUser,
        likeCount: Math.floor(Math.random() * 100), // 点赞数量
        dislikeCount: Math.floor(Math.random() * 20), // 踩数量
        commentCount: Math.floor(Math.random() * 50), // 评论数量
        shareCount: Math.floor(Math.random() * 30), // 分享数量
        isLiked: false, // 是否已点赞
        isDisliked: false // 是否已踩
      });
    }
    
    this.setData({
      companyList: companyList
    });
  },
  
  // 页面显示时调用，确保选中的城市名称更新
  onShow: function() {
    // 从本地存储获取选中的城市
    const selectedCity = wx.getStorageSync('selectedCity') || '';
    this.setData({
      selectedCity: selectedCity
    });
  },
  
  // 搜索框点击事件，跳转到搜索页面
  onSearchTap: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  
  // 最新/最热切换
  onSortTap: function(e) {
    const sort = e.currentTarget.dataset.sort;
    this.setData({
      activeSort: sort
    });
    // 这里可以根据sort参数请求不同的数据
    console.log('切换排序方式:', sort);
  },
  
  // 城市筛选，跳转到城市选择页面
  onCityTap: function() {
    wx.navigateTo({
      url: '/pages/city/city'
    });
  },
  
  // 筛选功能
  onFilterTap: function() {
    console.log('点击筛选');
    // 这里可以弹出筛选面板
  },
  
  // 点赞事件
  onLikeTap: function(e) {
    const id = e.currentTarget.dataset.id;
    const { companyList } = this.data;
    const updatedList = companyList.map(item => {
      if (item.id === id) {
        let likeCount = item.likeCount;
        let dislikeCount = item.dislikeCount;
        let isLiked = item.isLiked;
        let isDisliked = false;

        // 如果已点赞，则取消点赞
        if (item.isLiked) {
          likeCount--;
          isLiked = false;
        } else {
          // 否则点赞，并且取消踩
          likeCount++;
          isLiked = true;
          if (item.isDisliked) {
            dislikeCount--;
          }
        }

        return {
          ...item,
          likeCount: likeCount,
          dislikeCount: dislikeCount,
          isLiked: isLiked,
          isDisliked: isDisliked
        };
      }
      return item;
    });
    this.setData({
      companyList: updatedList
    });
  },
  
  // 踩事件
  onDislikeTap: function(e) {
    const id = e.currentTarget.dataset.id;
    const { companyList } = this.data;
    const updatedList = companyList.map(item => {
      if (item.id === id) {
        let likeCount = item.likeCount;
        let dislikeCount = item.dislikeCount;
        let isLiked = false;
        let isDisliked = item.isDisliked;

        // 如果已踩，则取消踩
        if (item.isDisliked) {
          dislikeCount--;
          isDisliked = false;
        } else {
          // 否则踩，并且取消点赞
          dislikeCount++;
          isDisliked = true;
          if (item.isLiked) {
            likeCount--;
          }
        }

        return {
          ...item,
          likeCount: likeCount,
          dislikeCount: dislikeCount,
          isLiked: isLiked,
          isDisliked: isDisliked
        };
      }
      return item;
    });
    this.setData({
      companyList: updatedList
    });
  },
  
  // 评论事件
  onCommentTap: function(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击评论:', id);
    // 这里可以跳转到评论页面或弹出评论输入框
  },
  
  // 分享事件
  onShareTap: function(e) {
    const id = e.currentTarget.dataset.id;
    console.log('点击分享:', id);
    // 这里可以调用分享接口
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  }
})