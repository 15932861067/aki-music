<template>
  <div class="search-container">
    <!-- 输入框 -->
    <el-input placeholder="请输入内容" :on-keypress="allowSpace" size="small" v-model.trim="searchWord" v-popover:popover
      slot="reference" @keyup.enter.native="search">
      <span slot="suffix" class="el-icon-search" @click="search"></span>
    </el-input>
    <!-- 热搜弹出框 -->
    <el-popover ref="popover" placement="bottom" width="350" trigger="focus">
      <div class="list">
        <!-- 搜索历史 -->
        <div class="history" v-if="historySearch.length !== 0">
          <!-- 头部 -->
          <div class="hd">
            <h3>搜索历史</h3>
            <span @click="deleteAll" class="iconfont icon-delete">清空</span>
          </div>
          <!-- 内容 -->
          <div class="bd">
            <div class="historylist">
              <div class="historylistitem" v-for="(item, i) in historySearch" :key="i" @mouseover="showClear(i)"
                @mouseleave="clearIcon = false" @click="addHotWord(item)">
                <span class="icon"></span>
                <span class="txt">{{ item }}</span>
                <span class="icon"><i class="iconfont icon-guanbi" v-if="(clearIcon && historySearchIndex == i)"
                    @click.stop="deleteHistory(i)"></i></span>
              </div>
            </div>
          </div>
        </div>

        <!-- 热搜榜 -->
        <div class="hot-search-rank hot-search-pop">
          <h3>热搜榜</h3>
          <ul>
            <li v-for="(item, i) in searchList" :key="i" @click="addHotWord(item.searchWord)">
              <!-- 左侧序号 -->
              <div class="num" :class="(i < 3 ? 'hotword-num' : '')">
                {{ (i + 1) }}
              </div>
              <!-- 右侧内容 -->
              <div class="main-content">
                <div class="word">
                  <span :class="(i < 3 ? 'hotword' : '')">
                    {{ item.searchWord }}
                  </span>
                  <span class="by">{{ item.score }}</span>
                  <span class="icon" v-if="item.iconUrl">
                    <img :src="item.iconUrl" alt="">
                  </span>
                </div>
                <p class="by" v-if="item.content">{{ item.content }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { getSearchHotWord } from '@/network/searchdetail/searchdeatil';

export default {
  data() {
    return {
      searchWord: "",
      searchList: [],
      historySearch: this.getItem("historySearch") ? this.getItem("historySearch") : [],
      clearIcon: false,
      historySearchIndex: 0,
      // reSearch: false
    }
  },
  created() {
    // 搜索的网络请求
    getSearchHotWord().then(res => {
      this.searchList = res.data.data
    })
  },
  methods: {
    allowSpace(event) {
      let char = String.fromCharCode(event.keyCode || event.charCode);
      // 允许空格键的ASCII码是32
      if (char === ' ' || event.key === ' ') {
        event.preventDefault();  // 阻止默认操作
      }
      console.log("运行了");
    },
    search() {
      if (this.searchWord == '') {
        this.$message({
          showClose: true,
          message: '请输入搜索内容',
          type: 'warning',
          center: true
        })
      } else {
        this.$router.push({ path: '/searchdetail/' + this.searchWord });
        this.$refs.popover.doClose()  //关闭弹窗
        this.addHistory(this.searchWord)
      }
    },
    // 添加到历史记录里
    addHistory(searchWord) {
      if (!this.historySearch.includes(searchWord)) {
        this.historySearch.push(searchWord); //添加历史搜索
        this.setItem("historySearch", this.historySearch);
      }
    },
    showClear(i) {
      this.clearIcon = true
      this.historySearchIndex = i
    },
    deleteHistory(i) {
      this.historySearch.splice(i, 1)
      this.setItem("historySearch", this.historySearch);
    },
    addHotWord(word) {
      this.$refs.popover.doClose(); //关闭弹框
      this.searchWord = word;
      this.$router.push("/searchdetail/" + this.searchWord).catch(err => err);
      this.addHistory(word);
    },
    deleteAll() {
      this.removeItem("historySearch");
      this.historySearch = [];
    },
  },
  watch: {

  },
  beforeUpdate() {

  }
}
</script>

<style lang="scss" scoped>
.search-container {
  position: relative;
  display: flex;
  align-items: center;

  .el-icon-search {
    cursor: pointer;
    padding-top: 10px;

    &:hover {
      color: #409EFF;
      font-weight: 700;
    }
  }
}

.list {
  width: 350px;
  height: 450px;
  overflow-y: scroll;

  h3 {
    padding-left: 6px;
  }
}

.history {
  padding-top: 5px;

  .hd {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;

    .icon-delete {
      font-size: 13px;
      padding-left: 10px;

      &:hover {
        color: #409EFF;
        cursor: pointer;
      }
    }
  }

  .bd {
    .historylist {
      display: flex;
      flex-wrap: wrap;
      padding: 10px 5px;

      .historylistitem {
        margin-left: 5px;
        margin-bottom: 5px;
        padding: 3px 0;
        font-size: 13px;
        border-radius: 15px;
        border: 1px solid #d3d3d3;
        cursor: pointer;

        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          margin-right: 3px;
        }

        .icon-guanbi {
          font-size: 12px;

          &:hover {
            color: #409EFF;
          }
        }
      }
    }
  }
}

.hot-search-rank {
  // width: 350px;
  // height: 450px;
  // overflow-y: scroll;
  cursor: pointer;
  background: #fff;

  li {
    display: flex;
    align-items: center;
    padding: 10px 5px;

    .num {
      width: 30px;
      padding-left: 5px;
    }

    .hotword-num {
      color: red;
      font-weight: 700;
    }

    .main-content {
      .word {
        span {
          padding-right: 10px;
        }

        .icon {
          display: inline-block;
          width: 30px;
          height: 20px;

          img {
            width: 100%;
          }
        }
      }

      p {
        padding-top: 5px;
      }

      .hotword {
        color: black;
        font-weight: 700;
      }
    }
  }

  li:hover {
    background: rgba(220, 220, 220, 0.4);
  }
}
</style>
