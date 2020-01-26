//stage 1  model1 	4*4


// 자바스크립트 코드
$(document).ready(function() {



    // 타이머 시작
    timer = setInterval(function() {
        console.log(timeLeft, "<- 남은시간!!! @timer");
        // 라운드 시작시 외울시간 3초 주기 
        if (timeLeft > 0) {
            timeLeft--;
            console.log(timeLeft, "<- 남은시간 감소 @timer");
            // 0 이 되면 시작 
            if (timeLeft == 0) {
                $(".card").each(function(i) {
                    let card = $(this);
                    // 순서대로 뒤집기
                    flip = setTimeout(function() {
                        console.log("works!");
                        $(card).toggleClass("flipped");
                    }, i * 18);
                })
                $("#timer").text("시작합니다!");
                // 클릭 가능으로 전환
                temp = 1;
                return;
            }
            // 시작까지 몇초 남았는지 표시 
            $("#timer").text("시작까지 " + timeLeft + "초");
            return;
        }
        timerNum++;
        // 경과 시간 표시 
        $("#timer").text("경과시간 " + timerNum + " 초");
    }, 1000);

    //로그아웃 버튼
    $("#logoutBtn").click(function() {
        console.log("out");
        $.ajax({
            // 로그아웃 서블릿을 통해 세션 없에기 (invalidate)
            url: "/puzzle/Logout",
            method: "POST",
            success: function(json) {
                console.log("sessionInfo : ", loginState);
                location.href = "/puzzle/index.html";
                return;
            },
            error: function() {
                alert("로그아웃 실패.");
            },
            fail: function() {
                alert("로그아웃 실패.");
            }
        });
    });
    // 다시하기 버튼
    $("#againBtn").click(function() {
        alert("다시 시작!");
        location.href = "/puzzle/puzzle.html";
    });
    // 홈으로 버튼 
    $("#toHomeBtn").click(function() {
        location.href = "/puzzle/index.html";
    });

    // 힌트 버튼 클릭시 
    $("#hintBtn").click(function() {
        // 게임 시작 전에 힌트 버튼 클릭시 작동 방지 
        if (temp < 1) {
            return;
        }
        remainHint--; //힌트 사용 가능 횟수 감소
        // 남은 힌트 수 업데이트
        $("#remainHint").text(remainHint);
        // 힌트 사용  맞추지 못한 카드 모두 뒤집어 패 보여주기 - 맞춘 쌍은 뒷면을 보여 헷갈림 방지 
        $(".card").each(function() {
                $(this).toggleClass("flipped");
            })
            // 클릭 방지 전환
        temp = 0;
        console.log("힌트 실행중 temp:" + temp);
        // 2초 대기후  카드 뒤집기 
        setTimeout(function() {
            console.log("대기 후 다시 돌림 ")
            $(".card").each(function() {
                    $(this).toggleClass("flipped");
                })
                // 클릭 가능으로 전환 
            temp = 1;
            console.log("힌트 실행 후 temp:", temp);
        }, 1000);
        // 힌트 실행 후 남은 횟수 0 이면 비활성화 
        if (remainHint == 0) {
            $("#hintBtn").attr("disabled", "disabled");
            return;
        }
    })

    /*
     * 게임 실행
     * 1. 변수 선언
     * 2. 그림 클릭시 보여주기
     * 3. 짝 맞나 확인 
     * 4. 맞으면 카드 모습 유지
     */

    // 게임 실행을 위한 변수 설정
    // 총 클릭횟수를 담을 변수 초기화
    let total = 0;
    // 카드 쌍 클릭시 구분을 위한 변수 초기화
    let state = 0; // 1번 클릭시 1 2번째 클릭시 2
    // 맞춘 카드쌍의 개수를 담을 변수 초기화 
    let success = 0; // 카드 쌍이 8쌍이면 8일시 리턴.
    // 첫번째와 두번째 카드를 비교할 때 쓸 변수 초기화
    let onePic = null;
    let twoPic = null;
    // 카드 클릭시 실행
    $(document).on("click", ".card", function() {
        console.log($(this), "click!");
        // 게임이 시작전이면 클릭 못하게 막기
        if (temp < 1) {
            return;
        }
        // 더블 클릭방지 & 이미 맞춘 쌍 뒤집어짐 방지
        if ($(this).attr('class') === "card") {
            // 더블 클릭 방지 태그에서 flipped가 없으면 카드의 앞면이 보인다는 뜻. 즉, ㅇ
            return;
        }
        //클릭 횟수 소진시 아래 코드 실행 하지 않기. 세번 클릭을 방지하기 위함
        if (state == 2) {
            return;
        }
        // 클릭횟수 증가 및 출력 
        total++;
        $("#count").text(total);
        // 몇번째 카드를 선택했는지 알 수 있도록 스테이트 값 증가 
        state++;
        $(this).toggleClass("flipped");
        if (1 == state) {
            // 첫번째 선택 저장
            console.log("1");
            onePic = $(this);
            console.log(onePic);
        }
        if (2 == state) {
            // 두번째 선택 저장 
            console.log("2");
            twoPic = $(this);
            console.log(twoPic);

            // 두 값 비교 
            if ($(onePic).attr("id") == $(twoPic).attr("id")) { // 쌍이 맞으면 저장 
                // 성공 횟수 증가 
                success++;
                // 선택횟수 초기화 
                state = 0;
                // 모든 쌍을 맞추면 스테이지 클리어 
                if (success == model.length / 2) {
                    alert("스테이지" + stage + " 클리어‼ \n" + loginState + "님의 누적시간은 " + timerNum + "이고 시도횟수는 " + total + "입니다 ☑");
                    console.log(timeLeft, "<- 남은시간");
                    // 클릭 가능에서 불가능으로 전환
                    temp = 0;
                    // 남은 시간 초기화 
                    timeLeft = 4;
                    console.log(timeLeft, "<- 남은시간");
                    console.log(loginState);
                    // 스테이지 증가
                    stage++;
                    console.log(stage);
                    // 맞춘 쌍 개수 초기화 
                    success = 0;
                    // 모든 스테이지를 클리어 하지 않았다면 다음 스테이지로 진행 
                    if (stage < 4) {
                        // stage1 이면 모델1, stage2 이면 모델2, 
                        console.log("stage: ", stage);
                        // 현재 스테이지에서 다음 스테이지로 증가 
                        if (stage == 2) {
                            model = model2;
                            cardRow += 2;
                        } else if (stage == 3) {
                            model = model3;
                            cardRow += 2;
                        }
                        console.log("***model.length: ", model.length);
                        // 모델 순서 섞기
                        for (let i = 0; i < 100000; i++) {
                            let ran = Math.floor(Math.random() * model.length);
                            let tmp = model[0];
                            model[0] = model[ran];
                            model[ran] = tmp
                        }
                        // 모델 출력
                        $("#board").empty();
                        $("#board").append("<tr>");
                        $(model).each(function(index, item) {
                            // 우클릭 방지 : oncontextmenu ='return false'
                            // 드래그 방지 : ondragstart ='return false'
                            let html = "<td oncontextmenu ='return false' ondragstart ='return false' ><div class='cards'>" +
                                "<div class='card' id='pic-" + item + "'><div class='front' id='p" + index + "'><input type='image' src='/puzzle/pzImage/" +
                                item + "'></div><div class='back'><p>🎆</p></div></div></div></td>";
                            // 줄바꿈 
                            if (index / cardRow > 0 && index % cardRow == 0) { // 6*6 이면 6과 나누어 떨어질 때 줄 바꿈 
                                console.log(index);
                                $("#board").append("</tr><tr>");
                            }
                            // 보드에 출력 
                            $("#board").append(html);
                        });

                    } else {
                        // 서버로 최종 결과 전송
                        alert("게임종료✔️ \n" + loginState + "님의 최종 기록시간은 " + timerNum + "이고 최종 시도횟수는 " + total + "입니다 🎊");
                        console.log(loginState);
                        // 디비에 게임기록 저장
                        $.ajax({
                            url: "/puzzle/AddReport",
                            method: "POST",
                            data: {
                                "timer": timerNum,
                                "count": total,
                                "memberId": loginState
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
                    $(onePic).toggleClass("flipped");
                    $(twoPic).toggleClass("flipped");
                    onePic = null;
                    twoPic = null;
                    state = 0;
                }, 370);
            }
        }
    });
});