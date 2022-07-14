const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// const PlAYER_STORAGE_KEY = "PLAYER";

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playList = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying : false,
    isRandom : false,
    isRepeat : false,
    // config: {},
    // (1/2) Uncomment the line below to use localStorage
    // config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    song: [
        {
            name: "Tệ Thật, Anh Nhớ Em",
            singer: "Thanh Hưng",
            path: "./assets/music/y2mate.com - Tệ Thật Anh Nhớ Em  Thanh Hưng  Official Lyric Video.mp3",
            image: "./assets/img/1650016194910_640.jpg"
        },
        {
            name: "We Don't Talk Anymore",
            singer: "Charlie Puth",
            path: "./assets/music/y2mate.com - Charlie Puth  We Dont Talk Anymore feat Selena Gomez Official Video.mp3",
            image: "./assets/img/Wedonttalkanymore.jpg"
        },
        {
            name: "Attention",
            singer: "Charlie Puth",
            path: "./assets/music/y2mate.com - Charlie Puth  Attention Official Video.mp3.webm",
            image: "./assets/img/Charlie_Puth_-_Attention_(Official_Single_Cover).jpg"
        },
        {
            name: "See You Again",
            singer: "Charlie Puth vs Wiz Khalifa",
            path: "./assets/music/y2mate.com - Wiz Khalifa  See You Again ft Charlie Puth Official Video Furious 7 Soundtrack.mp3",
            image: "./assets/img/wiz-khalifa-see-you-again-vid-billboard-1548_kzhw.jpg"
        },
        {
            name: "How Long",
            singer: "Charlie Puth",
            path: "./assets/music/y2mate.com - Charlie Puth  How Long Official Video.mp3",
            image: "./assets/img/maxresdefault.jpg"
        },
        {
            name: "Ánh Sao Và Bầu Trời",
            singer: "T.R.I x Cá",
            path: "./assets/music/y2mate.com - Ánh Sao Và Bầu Trời  TRI x Cá  Official Audio.mp3",
            image: "./assets/img/Ánh-Sao-Và-Bầu-Trời.jpg"
        },
        {
            name: "3107",
            singer: "Nâu, Duongg",
            path: "./assets/music/y2mate.com - 3107  Wn  Official Video  ft Nâu Duongg.mp3",
            image: "./assets/img/3107.jpg"
        },
        {
            name: "3107-2",
            singer: "DuongG x Nâu x W/n x Freak D",
            path: "./assets/music/y2mate.com - 31072 Lofi Ver  DuongG x Nâu x Wn x Freak D (1).mp3",
            image: "./assets/img/3107-2.jpg"
        },
        {
            name: "3107-3",
            singer: " W/n ft. ( Nâu,Duongg,Titie )",
            path: "./assets/music/y2mate.com - 3107 3  Wn  ft  NâuDuonggTitie  OFFICIAL MV.mp3",
            image: "./assets/img/3107-3.jpg"
        },
        {
            name: "Light Switch",
            singer: "Charlie Puth",
            path: "./assets/music/y2mate.com - Charlie Puth  Light Switch Official Music Video.mp3",
            image: "./assets/img/mqdefault.jpg"
        },

    ],
    // setConfig: function (key, value) {
    //     this.config[key] = value;
        // (2/2) Uncomment the line below to use localStorage
        // localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
    // },

    render : function() {
        const htmls = this.song.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = "${index}">
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },

    defineProperties : function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.song[this.currentIndex];
            }
        })
    },

    handleEvents : function(){
        const _this = this

        // Xử lý CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            {transform: 'rotate(360deg)'}
        ], {
            duration: 10000,  //10 second
            iterations: Infinity,
        })

        cdThumbAnimate.pause()

        // Xử lý phóng to thu nhỏ CD 
        const cdWidth = cd.offsetWidth

        // document.onscroll = function() {
        //     const scrollTop =  window.scrollY || document.documentElement.scrollTop ;
        //     // console.log(scrollTop)
        //     const newWidth = cdWidth - scrollTop + 2000
        //     cd.style.width = newWidth > 0 ? newWidth + 'px' : 0
        //     cd.style.opacity = newWidth / cdWidth;
        
        // }

        // Xử lý khi click play 
        playBtn.onclick = function() {
            if(_this.isPlaying){
                audio.pause();
            }else {
                audio.play();
            }
            
        }

        // Khi song đc playing
        audio.onplay = function() {
            _this.isPlaying = true;
            player.classList.add('playing');
            cdThumbAnimate.play()
        }
        // Khi song đc pause
        audio.onpause = function() {
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor((audio.currentTime / audio.duration)*100)
                progress.value = progressPercent
            }
           
        }

        // Xử lý khi tua 
        progress.onchange = function(e) {
            const seekTime = e.target.value * audio.duration / 100 
            audio.currentTime = seekTime
        }

        // Khi next song
        nextBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong() 
            }else {
                _this.nextSong()

            }
            audio.play() 
            _this.render()
            _this.scrollToActiveSong()
        }
        // Khi prev song

        prevBtn.onclick = function() {
            if(_this.isRandom) {
                _this.playRandomSong() 
            }else {
                _this.prevSong()
            }
            audio.play() 
            _this.render()
            _this.scrollToActiveSong()

        } 

        // khi random song
        randomBtn.onclick = function() {
            // _this.setConfig("isRandom", _this.isRandom);
            if(_this.isRandom) {
                randomBtn.classList.remove('active')
                _this.isRandom = false
            }else {
                randomBtn.classList.add('active')
                _this.isRandom = true
            }
            
            
        }

        // Xử lý next song khi audio ended
        audio.onended = function() {
            if(_this.isRepeat) {
                audio.play()
            }else {
                nextBtn.click()
            }

        }

        // Xử lý khi repeat song 
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat 
            // _this.setConfig("isRepeat", _this.isRepeat);
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Lắng nghe hành vi khi click vào playList
        playList.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')
            if(songNode || e.target.closest('.option')) {
                // Xử lý khi click vào song mới
                if (songNode) {
                    // console.log(songNode.getAttribute('data-index'))
                    _this.currentIndex =Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }
            }
        }
    },

    scrollToActiveSong : function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            })
        },200)
    },

    loadCurrentSong : function() {
        

        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        
    },

    // loadConfig: function () {
    //     this.isRandom = this.config.isRandom;
    //     this.isRepeat = this.config.isRepeat;
    // },

    nextSong : function() {
        this.currentIndex++
        if(this.currentIndex >= this.song.length) {
            this.currentIndex = 0
        }

        this.loadCurrentSong();
    },

    prevSong : function() {
        this.currentIndex--
        if(this.currentIndex < 0)  {
            this.currentIndex = this.song.length -1
        }

        this.loadCurrentSong();
    },

    playRandomSong : function() {
        let newIndex = this.currentIndex
        do {
            newIndex = Math.floor(Math.random() * this.song.length)
        } while(newIndex === this.currentIndex)
        
        this.currentIndex = newIndex
        this.loadCurrentSong() 
    },

    start : function() {
        // Gán cấu hình từ config vào ứng dụng
        // this.loadConfig()  

        // Định nghĩa các thuộc tính cho object
        this.defineProperties()

        // Lắng nghe và xử ls các sự kiện (DOM events)
        this.handleEvents();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // Hiển thị trạng thái ban đầu của button repeat & random
        // Display the initial state of the repeat & random button
        // randomBtn.classList.toggle("active", this.isRandom);
        // repeatBtn.classList.toggle("active", this.isRepeat);
    }
}

app.start();
