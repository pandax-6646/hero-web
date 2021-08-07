var utils = {

  // 数据请求
  request(url, data = '', type) {
    var url = 'http:/47.107.117.248:3000/' + url;

    var result = new Promise(function (resolve, reject) {
      $.ajax({
        url,
        data,
        type,
        dataType: 'json',
        success(res) {
          if (res.code == '666') {
            resolve(res);
          } else {
            console.log(res)
            reject('响应失败，响应信息为' + res.code)
          }
        },

        error(err) {
          console.log(err)
          reject('请求失败，错误信息为' + err);
        }
      })
    })
    return result;
  },


  // 获取静态数据
  getMokeData() {
    var result = new Promise(function (resolve, reject) {
      $.ajax({
        url: './moke/data.json',
        data: {},
        type: 'get',
        dataType: 'json',
        success(res) {
          resolve(res);
        },

        error(err) {
          console.log(err);
          reject(err)
        }
      })
    })
    return result;
  },


  // 将静态数据添加到数据库中
  pushDataToMongo(data) {
    var self = this;
    var len = data.length;
    var count = 0;
    data.forEach(async function (value) {
      await self.request('push', value, 'post').then(function () {
        if (count == len) {
          alert('数据库初始化数据完毕，请操作');
        }
      }).catch(function (err) {
        console.log(err);
      })
      count++;
    })
  },


  // 初始化数据库
  async initMongo(len, randerData) {
    var self = this;

    // 只对数据库进行一次初始化操作
    if (len == 0) {
      await this.getMokeData().then(function (res) {
        self.pushDataToMongo(res);

        // 渲染初始化的数据
        randerData(res)
      }).catch(function (err) {
        console.log(err);
      });
    }
  },
}