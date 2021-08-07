var listView = {

  // 初始化
  init() {
    this.dataLen = 0;
    this.dataList = [];
    this.getListData();
    this.filterBtn();
  },


  // 获取任务列表数据
  async getListData() {
    var self = this;

    await utils.request('list', '', 'get').then(function (res) {

      self.dataLen = res.data.length;


      if (self.dataLen == 0 && window.confirm('系统检测到你的数据库没有数据，请初始化数据库；\n该操作只进行一次，请放心使用🧐🧐')) {

        // 初始化数据库，并把初始化的数据渲染出来
        utils.initMongo(self.dataLen, self.reanderData);
      }
      self.dataList = res.data;
      self.reanderData(res.data);

    }).catch(function (err) {
      console.log(err);
    })
  },


  // 渲染任务列表数据
  reanderData(data) {
    var str = '';
    data.forEach(function (value) {
      str += `<li class="flex jc-sb pl-15 pr-15 f16 ai-c">
                <img src="${value.imgUrl}" alt="">
                <div class="fg1 ml-10">
                  <span class="fs-20">${value.name}</span>
                  <p class="fc-999 fs-14 mt-5">${value.occupation}</p>
                </div>
                <a href="./detail.html?_id=${value._id}">详情</a>
              </li>`
    })
    $('.container').html(str);
  },


  // 头部筛选按钮
  filterBtn() {
    var filterStr = '';
    var self = this;
    var newData = [];
    $('.nav-top-bar li').click(function () {

      $('.active').removeClass('active');
      filterStr = $(this).addClass('active').find('label').text();

      newData = self.dataList.filter(function (value) {
        return value.occupation == filterStr;
      })

      if (newData.length == 0) {
        newData = self.dataList;
      }

      self.reanderData(newData);
    })
  }
}

listView.init();