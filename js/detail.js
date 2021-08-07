var detailView = {
  init() {
    this._id = '';
    this.getData();
    this.delOccupation();
  },


  // 获取详情页的数据
  async getData() {

    var self = this;
    this._id = location.search;

    await utils.request('detail', this._id, 'get').then(function (res) {
      self.randerData(res.data);
    }).catch(function (err) {
      console.log(err);
    })
  },


  // 渲染数据
  randerData(data) {

    var str = '';
    var skillStr = '';
    var hrefStr = '';

    data.skills.forEach(function (value) {
      skillStr += value + ' | ';
    })
    skillStr = skillStr.slice(0, skillStr.length - 2);

    str = `<li class="flex jc-sb pl-15 pr-15 ai-c">
              <span class="f14">姓名</span>
              <span class="f14">${data.name}</span>
            </li>
            <li class="flex jc-sb pl-15 pr-15 ai-c">
              <span class="f14">年龄</span>
              <span class="f14">${data.age} 岁</span>
            </li>
            <li class="flex jc-sb pl-15 pr-15 ai-c">
              <span class="f14">职业</span>
              <span class="f14">${data.occupation}</span>
            </li>
            <li class="flex jc-sb pl-15 pr-15 ai-c">
              <span class="f14">技能</span>
              <span class="f12">${skillStr}</span>
            </li>
            <li class="flex jc-sb pl-15 pr-15 ai-c">
              <span class="f14">被动</span>
              <span class="f14">${data.passive}</span>
            </li>`;
    $('.container').html(str);

    hrefStr = `${$('.edit-info-bth').attr('href')}?_id=${data._id}`;
    $('.edit-info-bth').attr('href', hrefStr);
  },


  // 删除人物按钮
  delOccupation() {
    var self = this;
    $('.del').click(function () {

      utils.request('delete', self._id, 'get').then(function (res) {

        if (res.data.ok == 1) {
          alert('删除成功....')
          location.href = './list.html';
        }

      }).catch(function (err) {
        console.log(err)
      })
    })
  }
}

detailView.init();