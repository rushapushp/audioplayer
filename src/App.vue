<template>
  <div class="flex flex-col justify-center items-center gap-3">
    <div class="font-bold">Player</div>
    <div
      class="flex flex-col justify-center items-center"
      v-for="playlist in playlists"
      :key="playlist.music.id"
    >
      <img
        class="w-[200px] h-[200px] rounded-[30px]"
        :src="
          'https://interview.vobrabotke.ru' + playlist.music[order].coverStorage
        "
        alt=""
      />
      <audio
        :src="
          'https://interview.vobrabotke.ru' + playlist.music[order].musicStorage
        "
        ref="audioPlayer"
        autoplay
        preload="auto"
        id="audio-player"
      ></audio>
      <div class="font-bold text-[20px]">{{ playlist.music[order].title }}</div>
      <div class="text-gray-300">{{ playlist.music[order].artist }}</div>
    </div>
    <div class="flex flex-row gap-5">
      
        
        <button
          class="bg-gradient-to-r from-purple-400 to-blue-400 px-4 py-3  w-[60px] rounded-full h-[50px] "
          v-on:click="showVolume"
        >
        <unicon name="volume" fill="white" />
        </button>
        <div id="volumeBox" class="invisible -rotate-90 flex flex-row justify-center items-center px-4 py-2 bg-gray-300 rounded-full absolute z-100 top-[200px] left-[720px] transition-transform">
        <input
          type="range"
          
          id="volumeSlider"
          v-on:change="changeVolume"
        />
      </div>

      <button
        class="bg-gradient-to-r from-purple-400 to-blue-400 px-4 py-3 w-[60px] h-[50px] rounded-full flex-col items-center"
        v-on:click="setPrev"
      >
      <unicon name="previous" fill="white" />
      </button>
      <button
        class="bg-gradient-to-r from-purple-400 to-blue-400 px-4 py-3 w-[60px] h-[50px] rounded-full flex-col items-center"
        v-on:click="toggleAudio"
      >
      <unicon :name=" isPlaying ? 'pause-circle' : 'play-circle' " fill="white" />
        
      </button>
      <button
        class="bg-gradient-to-r from-purple-400 to-blue-400 px-4 py-3 w-[60px] h-[50px] rounded-full flex-col items-center"
        v-on:click="setNext"
      >
      <unicon name="step-forward" fill="white" />
      </button>
      <button
        class="bg-gradient-to-r from-purple-400 to-blue-400 px-4 py-3 w-[60px] h-[50px] rounded-full flex-col items-center"
        v-on:click="muteVolume"
      >
      <unicon :name=" isMuted ? 'volume-off' : 'volume-mute' " :fill="isMuted ? 'green' : 'red' " />
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        order: 0,
        playlists: [],
        isPlaying: true,
        value: 0,
        isMuted: false,
        volumeIsVisible: false,
      };
    },
    methods: {
      setNext() {
        this.order += 1;
      },
      setPrev() {
        this.order -= 1;
      },

      showVolume() {
        if (this.volumeIsVisible == false) {
          (this.volumeIsVisible = true),
            (document.getElementById("volumeBox").style.visibility = "visible");
        } else {
          (this.volumeIsVisible = false),
            (document.getElementById("volumeBox").style.visibility = "hidden");
        }
      },

      toggleAudio() {
        var audio = document.getElementById("audio-player");
        if (audio.paused) {
          (this.isPlaying = true), this.fadeInVolume();
        } else {
          (this.isPlaying = false), this.fadeOutVolume();
        }
      },
      muteVolume() {
        var audio = document.getElementById("audio-player");
        var volumeControl = document.getElementById("volumeSlider");
        if (this.isMuted == false) {
          (this.isMuted = true), (audio.volume = 0);
        } else {
          (this.isMuted = false), (audio.volume = volumeControl.value / 100);
        }
      },
      changeVolume() {
        var audio = document.getElementById("audio-player");
        var volumeControl = document.getElementById("volumeSlider");
        volumeControl.addEventListener("input", function () {
          audio.volume = volumeControl.value / 100;
        });
      },

      fadeOutVolume() {
        var volumeControl = document.getElementById("volumeSlider");
        var audio = document.getElementById("audio-player");
        var fadeOutInterval = setInterval(function () {
          if (audio.volume >= 0.01) {
            audio.volume -= volumeControl.value / 100 / 333;
          } else {
            clearInterval(fadeOutInterval, audio.pause());
          }
        }, 10);
      },

      fadeInVolume() {
        var volumeControl = document.getElementById("volumeSlider");
        var audio = document.getElementById("audio-player");
        var fadeOutInterval = setInterval(function () {
          if (audio.volume <= volumeControl.value / 100) {
            audio.play();
            audio.volume += volumeControl.value / 100 / 333;
          } else {
            clearInterval(fadeOutInterval);
          }
        }, 10);
      },
    },

    mounted() {
      fetch("https://interview.vobrabotke.ru/player/api/playlist/0", {
        method: "get",
        headers: {
          Authorization:
            "Bearer 886c2a7449f56a783e709de10a91fcc6d7bbe2865120050ad4a3b57b2732c7d9",
        },
      })
        .then((response) => response.json())
        .then((data) => (this.playlists = data))

        .then((data) => console.log(data))
        .catch((err) => console.log(err.message));
    },
  };
</script>

<style></style>
