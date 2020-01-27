new Vue({
    el: "#puzzleApp",
    data: {
        model1: ["p0.png", "p0.png",
            "p1.png", "p1.png",
            "p2.png", "p2.png",
            "p3.png", "p3.png",
            "p4.png", "p4.png",
            "p5.png", "p5.png",
            "p6.png", "p6.png",
            "p7.png", "p7.png",
        ],

        //stage 2 model2	6*6
        model2: ["p0.png", "p0.png",
            "p1.png", "p1.png",
            "p2.png", "p2.png",
            "p3.png", "p3.png",
            "p4.png", "p4.png",
            "p5.png", "p5.png",
            "p6.png", "p6.png",
            "p7.png", "p7.png",
            "p8.png", "p8.png",
            "p9.png", "p9.png",
            "p10.png", "p10.png",
            "p11.png", "p11.png",
            "p12.png", "p12.png",
            "p13.png", "p13.png",
            "p14.png", "p14.png",
            "p15.png", "p15.png",
            "p16.png", "p16.png",
            "p17.png", "p17.png",
        ], // [0] ~ [17]

        //stage 3 model3	8*8
        model3: ["p0.png", "p0.png",
            "p1.png", "p1.png",
            "p2.png", "p2.png",
            "p3.png", "p3.png",
            "p4.png", "p4.png",
            "p5.png", "p5.png",
            "p6.png", "p6.png",
            "p7.png", "p7.png",
            "p8.png", "p8.png",
            "p9.png", "p9.png",
            "p10.png", "p10.png",
            "p11.png", "p11.png",
            "p12.png", "p12.png",
            "p13.png", "p13.png",
            "p14.png", "p14.png",
            "p15.png", "p15.png",
            "p16.png", "p16.png",
            "p17.png", "p17.png",
            "p0.png", "p0.png",
            "p1.png", "p1.png",
            "p2.png", "p2.png",
            "p3.png", "p3.png",
            "p4.png", "p4.png",
            "p5.png", "p5.png",
            "p6.png", "p6.png",
            "p7.png", "p7.png",
            "p8.png", "p8.png",
            "p9.png", "p9.png",
            "p10.png", "p10.png",
            "p11.png", "p11.png",
            "p12.png", "p12.png",
            "p13.png", "p13.png",
        ], // [0] ~ [31]

        // 변수 초기화 
        // 로그인한 유저의 아이디를 담을 변수 초기화
        loginState: "",
        // 타이머 수 저장할 변수 초기화
        timerNum: 0,
        // 게임 시작후 클릭이 가능한지 여부를 담는 변수 초기화
        temp: 0, // 0일시 클릭 불가 1일시 클릭 가능
        // 카드 출력시 행수를 담는 변수 변수 초기화
        cardRow: 4, // 4, 6, 8 
        // 남은 힌트 개수 담는 변수 초기화
        remainHint: 2,
        // 스테이지 시작시 기억을 위해 주는 시간 
        timeLeft: 4,
        cardBoard: "",
        // 게임 실행을 위한 변수 설정
        // 총 클릭횟수를 담을 변수 초기화
        total: 0,
        // 카드 쌍 클릭시 구분을 위한 변수 초기화
        state: 0, // 1번 클릭시 1 2번째 클릭시 2
        // 맞춘 카드쌍의 개수를 담을 변수 초기화 
        success: 0, // 카드 쌍이 8쌍이면 8일시 리턴.
        // 첫번째와 두번째 카드를 비교할 때 쓸 변수 초기화
        onePic: null,
        twoPic: null
    },
    methods: {
        // 타이머 시작
        //로그아웃 버튼
        logoutClick: function() {
            var $vm = this;
            console.log("out");
            $.ajax({
                url: "/puzzle/Logout",
                method: "POST",
                success: function(json) {
                    console.log("sessionInfo : ", $vm.loginUser);
                    location.href = "/puzzle/index.html";
                    alert("로그아웃 하셨습니다.");
                    return;
                },
                error: function() {
                    alert("로그아웃 실패 다시 입력해 주세요.");
                },
                fail: function() {
                    alert("로그아웃 실패 다시 입력해 주세요.");
                }
            });
        },
        // 다시하기 버튼
        againBtnClick: function() {
            alert("다시 시작!");
            location.href = "/puzzle/puzzle.html";
        },
        //홈 버튼 클릭시 인덱스 페이지로 이동
        toHomeBtnClick: function() {
            location.href = "/puzzle/index.html";
        },
        hintBtnClick: function() {
            var $vm = this;
            // 게임 시작 전에 힌트 버튼 클릭시 작동 방지 
            if ($vm.temp < 1) {
                return;
            }
            $vm.remainHint--; //힌트 사용 가능 횟수 감소
            // 남은 힌트 수 업데이트
            $("#remainHint").text($vm.remainHint);
            // 힌트 사용  맞추지 못한 카드 모두 뒤집어 패 보여주기 - 맞춘 쌍은 뒷면을 보여 헷갈림 방지 
            $(".card").each(function() {
                $(this).toggleClass("flipped");
            });
            // 클릭 방지 전환
            $vm.temp = 0;
            console.log("힌트 실행중 temp:" + $vm.temp);
            // 2초 대기후  카드 뒤집기 
            setTimeout(function() {
                console.log("대기 후 다시 돌림 ");
                $(".card").each(function() {
                    $(this).toggleClass("flipped");
                });
                // 클릭 가능으로 전환 
                $vm.temp = 1;
                console.log("힌트 실행 후 temp:", $vm.temp);
            }, 1000);
            // 힌트 실행 후 남은 횟수 0 이면 비활성화 
            if ($vm.remainHint == 0) {
                $("#hintBtn").attr("disabled", "disabled");
                return;
            }
        },

        /*
         * 게임 실행
         * 1. 변수 선언
         * 2. 그림 클릭시 보여주기
         * 3. 짝 맞나 확인 
         * 4. 맞으면 카드 모습 유지
         */
        cardClick: function() {
            var $vm = this;
            console.log($(this), "click!");
            // 게임이 시작전이면 클릭 못하게 막기
            if ($vm.temp < 1) {
                return;
            }
            // 더블 클릭방지 & 이미 맞춘 쌍 뒤집어짐 방지
            if ($(this).attr('class') === "card") {
                // 더블 클릭 방지 태그에서 flipped가 없으면 카드의 앞면이 보인다는 뜻. 즉, ㅇ
                return;
            }
            //클릭 횟수 소진시 아래 코드 실행 하지 않기. 세번 클릭을 방지하기 위함
            if ($vm.state == 2) {
                return;
            }
            // 클릭횟수 증가 및 출력 
            $vm.total++;
            $("#count").text($vm.total);
            // 몇번째 카드를 선택했는지 알 수 있도록 스테이트 값 증가 
            $vm.state++;
            $(this).toggleClass("flipped");
            if (1 == $vm.state) {
                // 첫번째 선택 저장
                console.log("1");
                $vm.onePic = $(this);
                console.log($vm.onePic);
            }
            if (2 == $vm.state) {
                // 두번째 선택 저장 
                console.log("2");
                $vm.twoPic = $(this);
                console.log($vm.twoPic);

                // 두 값 비교 
                if ($($vm.onePic).attr("id") == $($vm.twoPic).attr("id")) { // 쌍이 맞으면 저장 
                    // 성공 횟수 증가 
                    $vm.success++;
                    // 선택횟수 초기화 
                    $vm.state = 0;
                    // 모든 쌍을 맞추면 스테이지 클리어 
                    if ($vm.success == model.length / 2) {
                        alert("스테이지" + stage + " 클리어‼ \n" + $vm.loginState + "님의 누적시간은 " + $vm.timerNum + "이고 시도횟수는 " + total + "입니다 ☑");
                        console.log($vm.timeLeft, "<- 남은시간");
                        // 클릭 가능에서 불가능으로 전환
                        $vm.temp = 0;
                        // 남은 시간 초기화 
                        $vm.timeLeft = 4;
                        console.log($vm.timeLeft, "<- 남은시간");
                        console.log($vm.loginState);
                        // 스테이지 증가
                        stage++;
                        console.log(stage);
                        // 맞춘 쌍 개수 초기화 
                        $vm.success = 0;
                        // 모든 스테이지를 클리어 하지 않았다면 다음 스테이지로 진행 
                        if (stage < 4) {
                            // stage1 이면 모델1, stage2 이면 모델2, 
                            console.log("stage: ", stage);
                            // 현재 스테이지에서 다음 스테이지로 증가 
                            if (stage == 2) {
                                model = $vm.model2;
                                $vm.cardRow += 2;
                            } else if (stage == 3) {
                                model = $vm.model3;
                                $vm.cardRow += 2;
                            }
                            console.log("***model.length: ", model.length);
                            // 모델 순서 섞기
                            for (var i = 0; i < 100000; i++) {
                                var ran = Math.floor(Math.random() * model.length);
                                var tmp = model[0];
                                model[0] = model[ran];
                                model[ran] = tmp;
                            }
                            // 모델 출력
                            $("#board").empty();
                            $("#board").append("<tr>");
                            $(model).each(function(index, item) {
                                // 우클릭 방지 : oncontextmenu ='return false'
                                // 드래그 방지 : ondragstart ='return false'
                                var html = "<td oncontextmenu ='return false' ondragstart ='return false' ><div class='cards'>" +
                                    "<div class='card' id='pic-" + item + "'><div class='front' id='p" + index + "'><input type='image' src='/puzzle/pzImage/" +
                                    item + "'></div><div class='back'><p>🎆</p></div></div></div></td>";
                                // 줄바꿈 
                                if (index / $vm.cardRow > 0 && index % $vm.cardRow == 0) { // 6*6 이면 6과 나누어 떨어질 때 줄 바꿈 
                                    console.log(index);
                                    $("#board").append("</tr><tr>");
                                }
                                // 보드에 출력 
                                $("#board").append(html);
                            });

                        } else {
                            // 서버로 최종 결과 전송
                            alert("게임종료✔️ \n" + $vm.loginState + "님의 최종 기록시간은 " + $vm.timerNum + "이고 최종 시도횟수는 " + $vm.total + "입니다 🎊");
                            console.log($vm.loginState);
                            // 디비에 게임기록 저장
                            $.ajax({
                                url: "/puzzle/AddReport",
                                method: "POST",
                                data: {
                                    "timer": $vm.timerNum,
                                    "count": $vm.total,
                                    "memberId": $vm.loginState
                                },
                            });
                            //타이머 종료
                            clearInterval(timer);
                            return;
                        }
                    }
                } else { // 틀리면 초기화 
                    // 2번째 선택한 카드 확인
                    setTimeout(function() {
                        console.log('작동!');
                        $($vm.onePic).toggleClass("flipped");
                        $($vm.twoPic).toggleClass("flipped");
                        $vm.onePic = null;
                        $vm.twoPic = null;
                        $vm.state = 0;
                    }, 370);
                }
            }
        }
    },
    mounted() {
        var $vm = this;
        // 로그인 확인
        $.ajax({
            url: "/puzzle/GetSessionInfo",
            async: false, // 동기요청
            method: "POST",
            success: function(json) {
                $vm.loginState = json;
                console.log("sessionInfo : ", $vm.loginState);
            }
        });

        console.log($vm.loginState);
        // 로그인 안했을 시 돌아가기
        if ($vm.loginState == null) {
            location.href = "/puzzle/signIn.html";
            alert("로그인을 해야 게임을 플레이 할 수 있습니다 T.T \n 🎀  로그인 하러 고고 🎀");
            return false;
        }

        // 상단에 로그인 id표시
        $("#user").text($vm.loginState);

        var count = 0;

        //게임 시작시 알림 띄움
        alert("3초 동안 최대한 많이 기억하세요 ! \n확인 버튼을 누르면 시작합니다 !");
        // 힌트 개수 표시
        $("#remainHint").text($vm.remainHint);
        // 스테이지 초기화
        var stage = 1;
        // 모델 초기화 
        var model = $vm.model1;
        // model이 뒤섞여 순서가 랜덤으로 출력.
        for (var i = 0; i < 100000; i++) {
            var ran = Math.floor(Math.random() * model.length); // 0~ 카드갯수 -1 까지
            var tmp = model[0];
            model[0] = model[ran];
            model[ran] = tmp;
        }

        // 16개 이미지 출력.
        $("#board").append("<tr>");
        $(model).each(function(index, item) {
            // 우클릭 방지 : oncontextmenu ='return false'
            // 드래그 방지 : ondragstart ='return false'
            var html = "<td oncontextmenu ='return false' ondragstart ='return false' ><div class='cards'>" +
                "<div class='card' id='pic-" + item + "' v-on:click='cardClick'><div class='front' id='p" + index + "'><input type='image' src='/puzzle/pzImage/" +
                item + "'></div><div class='back'><p>⌛</p></div></div></div></td>";
            // 줄바꿈
            if (index / $vm.cardRow > 0 && index % $vm.cardRow == 0) {
                console.log(index);
                $("#board").append("</tr><tr>");
            }
            $("#board").append(html);
        });
    },
    destroyed() {
        timer: setInterval(function() {
            var $vm = this;
            console.log($vm.timeLeft, "<- 남은시간!!! @timer");
            // 라운드 시작시 외울시간 3초 주기 
            if ($vm.timeLeft > 0) {
                $vm.timeLeft--;
                console.log($vm.timeLeft, "<- 남은시간 감소 @timer");
                // 0 이 되면 시작 
                if ($vm.timeLeft == 0) {
                    $(".card").each(function(i) {
                        var card = $(this);
                        // 순서대로 뒤집기
                        flip = setTimeout(function() {
                            console.log("works!");
                            $(card).toggleClass("flipped");
                        }, i * 18);
                    });
                    $("#timer").text("시작합니다!");
                    // 클릭 가능으로 전환
                    $vm.temp = 1;
                    return;
                }
                // 시작까지 몇초 남았는지 표시 
                $("#timer").text("시작까지 " + $vm.timeLeft + "초");
                return;
            }
            $vm.timerNum++;
            // 경과 시간 표시 
            $("#timer").text("경과시간 " + $vm.timerNum + " 초");
        }, 1000);
    },
});