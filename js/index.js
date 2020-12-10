let vm = new Vue({
    // created 生命周期  请求初始数据
    async created() {
      let res = await myaxios.get("search", {
        params: {
          keywords: "热门",
        },
      });
      this.songs = res.result.songs;
    },
    el: '#app-music',
    data: {
      // 关键词
      keywords: "热门",
      // 歌曲列表信息
      songs: [],
      // 正在播放歌曲的url
      songUrl: "",
      // 默认情况音频没有在播放的
      isAudioPlaying: false,
      // 默认情况MV不播放
      isMVPlaying: false,
      // 中间歌曲图片
      coverUrl: "../imgs/cover.jpg",
      // 热门评论
      hotComments: [],
      // MV播放地址
      mvUrl: "",
    },
    methods: {
      // 获取歌曲信息
      getAudio: async function (id) {
        let res1 = await myaxios.get("song/url", {
          params: {
            id: id,
          },
        });
        this.songUrl = res1.data[0].url;
        this.isAudioPlaying = true;

        // 获取歌曲对应图片
        let res2 = await myaxios.get("song/detail", {
          params: {
            ids: id
          },
        });
        this.coverUrl = res2.songs[0].al.picUrl;

        // 获取歌曲评论
        let res3 = await myaxios.get("comment/hot?type=0", {
          params: {
            id: id,
          },
        });
        this.hotComments = res3.hotComments;
      },
      // 根据关键词搜索歌曲
      searchSongs: async function () {
        if (!this.keywords) {
          // 如果搜索关键字为空  返回false
          return false;
        };
        let res = await myaxios.get("search", {
          params: {
            keywords: this.keywords,
          },
        });
        this.songs = res.result.songs;
      },
      // 暂停音乐操作  终止中间内容的动画
      handlePause: function () {
        this.isAudioPlaying = false;
      },
      // 播放音乐操作  继续中间内容的动画
      handlePlay: function () {
        this.isAudioPlaying = true;
      },
      // 获取MV信息 播放MV  停止外部的音乐播放
      getMV: async function (id) {
        // 重复进入时  自动从当前位置播放
        this.$refs.video.play();
        // mv状态改成在播放
        this.isMVPlaying = true;
        // 关闭外部音频的播放
        this.$refs.audio.pause();
        // 获取mv播放地址
        let res = await myaxios.get("mv/url", {
          params: {
            id: id,
          },
        });
        this.mvUrl = res.data.url;
      },
      // 关闭MV
      closeMV: function () {
        this.$refs.video.pause();
        this.isMVPlaying = false;
      },
    },
  })