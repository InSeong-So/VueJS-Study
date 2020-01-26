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
    },
    methods: {

    },
    mounted() {
        // 로그인 확인
        $.ajax({
            url: "/puzzle/GetSessionInfo",
            async: false, // 동기요청
            method: "POST",
            success: function(json) {
                loginState = json;
                console.log("sessionInfo : ", loginState);
            }
        });

        console.log(loginState);
        // 로그인 안했을 시 돌아가기
        if (loginState == null) {
            location.href = "/puzzle/signIn.html";
            alert("로그인을 해야 게임을 플레이 할 수 있습니다 T.T \n 🎀  로그인 하러 고고 🎀");
            return false;
        }

        // 상단에 로그인 id표시
        $("#user").text(loginState);

        let count = 0;

        //게임 시작시 알림 띄움
        alert("3초 동안 최대한 많이 기억하세요 ! \n확인 버튼을 누르면 시작합니다 !");
        // 힌트 개수 표시
        $("#remainHint").text(remainHint);
        // 스테이지 초기화
        let stage = 1;
        // 모델 초기화 
        let model = model1;
        // model이 뒤섞여 순서가 랜덤으로 출력.
        for (let i = 0; i < 100000; i++) {
            let ran = Math.floor(Math.random() * model.length); // 0~ 카드갯수 -1 까지
            let tmp = model[0];
            model[0] = model[ran];
            model[ran] = tmp
        }

        // 16개 이미지 출력.
        $("#board").append("<tr>");
        $(model).each(function(index, item) {
            // 우클릭 방지 : oncontextmenu ='return false'
            // 드래그 방지 : ondragstart ='return false'
            let html = "<td oncontextmenu ='return false' ondragstart ='return false' ><div class='cards'>" +
                "<div class='card' id='pic-" + item + "'><div class='front' id='p" + index + "'><input type='image' src='/puzzle/pzImage/" +
                item + "'></div><div class='back'><p>⌛</p></div></div></div></td>";
            // 줄바꿈
            if (index / cardRow > 0 && index % cardRow == 0) {
                console.log(index);
                $("#board").append("</tr><tr>");
            }
            $("#board").append(html);
        });
    },
});