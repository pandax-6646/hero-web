var pushView = {

  init() {
    this.getPersonInfo();
    this.inputEvent();
  },


  // 获取页面中要提交的人物信息
  getPersonInfo() {
    var data = {};

    $('.submit').click(async function () {
      data.imgUrl = $('#imgUrl').val() == '' ? './images/default.png' : $('#imgUrl').val();
      data.name = $('#name').val();
      data.age = 1 * $('#age').val();
      data.occupation = $('#occupation').val();
      data.skills = $('#skills').val().split(',');
      data.passive = $('#passive').val();


      if (data.skills.length != 3) {
        data.skills = $('#skills').val().split('，');
      }



      if (data.name == '') {
        alert('人物名不能为空');

      } else {

        await utils.request('push', data, 'post').then(function () {
          $('input').val('');
          alert('添加成功!');
          location.href = './list.html';

        }).catch(function (err) {
          console.log(err);
        })
      }
    })
  },



  // 输入框事件
  inputEvent() {
    $('input').focus(function () {
      $(this).siblings().eq(1).css({
        top: '2px',
        left: '125px',
        fontSize: '12px'
      });


      $(this).blur(function () {

        if ($(this).val() == '') {
          $(this).siblings().eq(1).css({
            top: '18px',
            fontSize: '15px'
          })
        }
      })
    })

    $('.check').click(function () {
      console.log($(this).siblings().eq(1).focus());
    })

  }
}

pushView.init();