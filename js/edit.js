var editView = {
  init() {
    this._id = '';
    this.getData();
    this.pushChangeInfo();

  },


  // 获取数据
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
    var {
      age,
      imgUrl,
      name,
      occupation,
      passive,
      skills,
    } = data;

    skills = skills.join('，');

    $('#imgUrl').val(imgUrl);
    $('#name').val(name);
    $('#age').val(age);
    $('#occupation').val(occupation);
    $('#skills').val(skills);
    $('#passive').val(passive);

    this.inputEvent();
  },


  // 上传数据
  pushChangeInfo() {
    var obj = {};
    var self = this;

    $('.submit').click(async function () {

      obj.imgUrl = $('#imgUrl').val();
      obj.name = $('#name').val();
      obj.age = Number($('#age').val());
      obj.occupation = $('#occupation').val();
      obj.skills = $('#skills').val().split(',');
      obj.passive = $('#passive').val();
      obj._id = self._id.split('=')[1];


      if (obj.skills.length != 3) {
        obj.skills = $('#skills').val().split('，');
      }

      if (obj.name == '') {
        alert('人物名不能为空');

      } else {

        await utils.request('edit', obj, 'post').then(function (res) {
          if (res.data.ok == 1) {
            alert('正在保存')
            location.href = './list.html';
          }
        }).catch(function (err) {
          console.log(err);
        })
      }
    })
  },


  // 输入框事件
  inputEvent() {

    $('input').forEach(function (val) {

      var $Input = $(val);
      var valStr = $Input.val();
      // var $Div = $Input.siblings().eq(1);


      // 输入框有值
      if (valStr != '') {
        $Input.siblings().eq(1).css({
          top: '2px',
          left: '125px',
          fontSize: '12px'
        })
      }


      // 输入框失焦
      $Input.blur(function () {
        if ($Input.val() == '') {
          $Input.siblings().eq(1).css({
            top: '18px',
            fontSize: '15px'
          })
        } else {
          $Input.siblings().eq(1).css({
            top: '2px',
            left: '125px',
            fontSize: '12px'
          })
        }
      })


      // 输入框聚焦
      $Input.focus(function () {
        $Input.siblings().eq(1).css({
          top: '2px',
          left: '125px',
          fontSize: '12px'
        })
      });
    })



    // 选中输入框的提示文字
    $('.check').click(function () {
      $(this).siblings().eq(1).focus();
    })
  }
}

editView.init();