<template>
  <section v-if="group.admin">
    <router-link tag="div" :to="'/groups/' + group._id" class="preview-container">
      <div v-if="isFull" class="full-status">
        <h2>Full</h2>
      </div>
      <div class="img-container" :style="{ backgroundImage: 'url(' + group.img + ')' }"></div>
      <div class="main">
        <div class="bottom">
          <img :src="group.admin.img" alt>
          <div class="info-container">
            <div class="host">
              <h2>
                Cook With:
                <span>{{group.admin.username}}</span>
                and {{group.users.length}} others
              </h2>
            </div>
            <div class="title">
              <h1>{{group.title}}</h1>
            </div>
            <h2>in {{group.place.city}}, {{group.place.country.shortName}}</h2>
            <h2>
              <slot name="comming-up"></slot>
            </h2>
            <h3>
              <div class="meal">{{group.eventType}}</div>
            </h3>
          </div>
        </div>
      </div>
    </router-link>
  </section>
</template>

<script>
import participants from "./card-participants/card-participants-cmp";
export default {
  props: {
    group: {
      type: Object,
      required: true,
      default: function() {
        return "EMPTY";
      }
    }
  },
  data() {
    return {
    };
  },
  computed: {
    seatsLeft() {
      return this.group.guests - this.group.users.length;
    },
    isFull() {
      return this.group.guests === this.group.users.length ? "Full" : "";
    }
  },

};
</script>

<style scoped lang="scss">
section {
  margin: 10px;
  display: inline-block;
  .preview-container:hover {
    .title {
      h1 {
        color: orangered;
      }
    }
  }
  .preview-container {
    display: inline-block;
    position: relative;
    // margin: 20px;
    width: 260px;
    height: 378px;

    // border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    .full-status {
      position: absolute;
      right: 0;
      h2 {
        background-color: #f44336;
        text-align: center;
        color: white;
        letter-spacing: 1px;
        padding: 10px;
        width: 65px;
      }
    }
    .img-container {
      height: 315px;
      // width: 280px;
      // background-image: url("../../assets/preview-demo.jpg");
      background-color: lightseagreen;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    h1 {
      padding-top: 8px;
      line-height: 22px;
      // text-align: center;
      color: #414a55;
      font-size: 19px;
    }

    .main {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 80%;

      background: linear-gradient(
        to bottom,
        rgba(50, 50, 50, 0) 0%,
        rgba(16, 15, 15, 0.67) 89%,
        rgba(16, 15, 15, 0.93) 120%
      ) !important;
      border-radius: 0 0 10px 10px;
      .bottom {
        width: 100%;
        background-color: white;
        height: 180px;
        position: absolute;
        bottom: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border: 1px solid #b3b3b3ad;
        border-top: none;

        img {
          cursor: pointer;

          width: 60px;
          height: 60px;
          border: 3px white solid;
          background-color: white;
          border-radius: 73px;
          position: absolute;
          top: -30px;
          left: 95px;
          object-fit: cover;
        }
        .info-container {
          padding-top: 27px;
          padding: 0px 6px;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          text-align: left;
          .host {
            text-align: center;
            h2 {
              padding-top: 27px;
            }
          }
          .title {
            text-align: left;
            padding-left: 7px;
            overflow: scroll;
            h1 {
              transition: 0.3s;
            }
          }
        }
        h2 {
          font-size: 14px;
          span {
            color: orangered;
          }
        }
        h3 {
          font-size: 13px;
        }
        .meal {
          background-color: rgb(223, 226, 231);

          display: inline-block;
          padding: 3px;
        }
        h2,
        h3 {
          color: #414a55;
          padding-left: 7px;
        }
        .has-container {
          // overflow-x: scroll;
          overflow-y: hidden;
          white-space: nowrap;
          padding-left: 6px;

          span {
            padding-left: 7px;
            color: #414a55;
          }
        }
      }
    }
  }
  .preview-container:hover {
  }
}
</style>
