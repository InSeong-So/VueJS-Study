new Vue({
    el: '#app',
    data: {
        loginUser: "",
        report: "",
    },
    methods: {
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
        // 로그인 버튼
        loginClick: function() {
            console.log("go");
            location.href = "/puzzle/signIn.html";
        },
        // 회원가입 
        signUpClick: function() {
            console.log("go");
            location.href = "/puzzle/signUp.html";
        },
        //순위 출력		
        // 종합 탑 10
        totalTop10Click: function() {
            var $vm = this;
            console.log("totalTop10!");
            $("#top10Text").text("🏆 종합 Top 10 🏆");
            $("#report").empty();
            $vm.report = "";
            $vm.report += "<thead><tr><th>순위</th><th>아이디</th><th>횟수</th><th>기록</th><th>날짜 시간</th></tr></thead><tbody>";
            $.ajax({
                url: "/puzzle/SelectTotalTop10",
                method: "POST",
                success: function(json) {
                    //				console.log(json);
                    $vm.report += "<tbody>";
                    $(json).each(function(index, item) {
                        $vm.report += "<tr>";
                        $vm.report += "<td>" + (index + 1) + "</td>";
                        $vm.report += "<td>" + item.memberId + "</td>";
                        $vm.report += "<td>" + item.count + "</td>";
                        $vm.report += "<td>" + item.timer + "</td>";
                        $vm.report += "<td>" + item.reportDate + "</td>";
                        $vm.report += "</tr>";
                    })
                    $vm.report += "</tbody>";
                    $("#report").append($vm.report);
                    $("#view").hide();
                    $("#view").slideDown("slow");
                }
            });
        },
        // 데일리 탑10
        dailyTop10Click: function() {
            var $vm = this;
            console.log("dailyTop10!");
            $("#top10Text").text("🥇 오늘의 Top 10 🥇");
            $("#report").empty();
            $vm.report = "";
            $.ajax({
                url: "/puzzle/SelectTodayTop10",
                method: "POST",
                success: function(json) {
                    //				console.log(json);					
                    if (json == "") {
                        $("#report").append("<hr><br><br><h1 class='display-4'><small>순위권에 든 플레이어가 없습니다!<br>오늘의 랭커가 되어보세요 !🔥</small></h1>");
                        $("#view").hide();
                        $("#view").slideDown("fast");
                        return;
                    }
                    $vm.report += "<thead><tr><th>순위</th><th>아이디</th><th>횟수</th><th>기록</th><th>날짜 시간</th></tr></thead><tbody>";
                    $(json).each(function(index, item) {
                        $vm.report += "<tr>";
                        $vm.report += "<td>" + (index + 1) + "</td>";
                        $vm.report += "<td>" + item.memberId + "</td>";
                        $vm.report += "<td>" + item.count + "</td>";
                        $vm.report += "<td>" + item.timer + "</td>";
                        $vm.report += "<td>" + item.reportDate + "</td>";
                        $vm.report += "</tr>";
                    });
                    $vm.report += "</tbody>";
                    $("#report").append($vm.report);
                    $("#view").hide();
                    $("#view").slideDown("fast");
                }
            });
        },
        // 먼슬리 탑10
        monthlyTop10Click: function() {
            var $vm = this;
            console.log("monthlyTop10!");
            $("#top10Text").text("🏅 이달의 Top 10 🏅");
            $("#report").empty();
            $.ajax({
                url: "/puzzle/SelectMonthlyTop10",
                method: "POST",
                success: function(json) {
                    //				console.log(json);
                    $vm.report = "";
                    if (json == "") {
                        $("#report").append("<hr><br><br><h1 class='display-4'><small>순위권에 든 플레이어가 없습니다!<br>오늘의 랭커가 되어보세요 !🔥</small></h1>");
                        $("#view").hide();
                        $("#view").slideDown("fast");
                        return;
                    }
                    $("#report").empty();
                    $vm.report += "<thead><tr><th>순위</th><th>아이디</th><th>횟수</th><th>기록</th><th>날짜 시간</th></tr></thead><tbody>";
                    $(json).each(function(index, item) {
                        $vm.report += "<tr>";
                        $vm.report += "<td>" + (index + 1) + "</td>";
                        $vm.report += "<td>" + item.memberId + "</td>";
                        $vm.report += "<td>" + item.count + "</td>";
                        $vm.report += "<td>" + item.timer + "</td>";
                        $vm.report += "<td>" + item.reportDate + "</td>";
                        $vm.report += "</tr>";
                    });
                    $vm.report += "</tbody>";
                    $("#report").append($vm.report);
                    $("#view").hide();
                    $("#view").slideDown("fast");
                }
            });
        },

        // 게임스타트 버튼
        gameStartClick: function() {
            var $vm = this;
            console.log("game!");
            location.href = "/puzzle/puzzle.html";
        },

        // 마이페이지 버튼
        myPageClick: function() {
            var $vm = this;
            console.log("myPage!");
            location.href = "/puzzle/myPage.html";
        },
        // 마이리포트 버튼
        myReportClick: function() {
            var $vm = this;
            console.log("myReport!");
            $("#top10Text").text("📃 마이 리포트 📃");
            $("#report").empty();
            $vm.report = "";
            $.ajax({
                url: "/puzzle/SelectMemberReport",
                data: { memberId: $vm.loginUser },
                method: "POST",
                success: function(json) {
                    if (json == "") {
                        $vm.report = "<hr><br><br><h1 class='display-4'><small>기록이 아직 없군요 ..!<br>기록을 세워 랭커에 도전해보세요 !🔥</small></h1>";
                        $("#report").append($vm.report);
                        $("#view").hide();
                        $("#view").slideDown("fast");
                        //					$("#report").hide();
                        //					$("#report").show("slow");
                        return;
                    }
                    $vm.report += "<thead><tr><th>번호</th><th>기록번호</th><th>횟수</th><th>기록</th><th>날짜</th></tr></thead><tbody>";
                    $(json).each(function(index, item) {
                        $vm.report += "<tr>";
                        $vm.report += "<td>" + (index + 1) + "</td>";
                        $vm.report += "<td>" + item.reportId + "</td>";
                        $vm.report += "<td>" + item.count + "</td>";
                        $vm.report += "<td>" + item.timer + "</td>";
                        $vm.report += "<td>" + item.reportDate + "</td>";
                        $vm.report += "</tr>";
                    });
                    $vm.report += "</tbody>";
                    $("#report").append($vm.report);
                    $("#view").hide();
                    $("#view").slideDown("fast");
                },
            });
        },
        //로그인 버튼 클릭시 회원 인덱스 페이지로 이동. 
        loginBtnClick: function() {
            var $vm = this;
            console.log("#loginBtn");
            $.ajax({
                // 포스트 방식으로 Login 서블릿으로 넘겨 유저가 입력한 정보와 일치하는지 확인 및 유저 아이디 가져오기 
                url: "/puzzle/Login",
                method: "POST",
                data: {
                    memberId: $("#memberId").val(),
                    memberPw: $("#memberPw").val()
                },
                success: function(json) {
                    $vm.loginUser = json;
                    // 로그인한 유저 아이디
                    console.log("sessionInfo : ", $vm.loginUser);
                    location.href = "/puzzle/index.html";
                    return;
                }, // 실패시 알림
                error: function() {
                    alert("로그인 실패 다시 입력해 주세요.");
                },
                fail: function() {
                    alert("로그인 실패 다시 입력해 주세요.");
                }
            });
        },
        //홈 버튼 클릭시 인덱스 페이지로 이동
        toHomeBtnClick: function() {
            location.href = "/puzzle/index.html";
        },
        joinBtnClick: function() {
            if ($("#memberId") == "" || $("#memberId") == "") {
                alert("정보를 기입해주세요 ㅠㅠ");
                return;
            }
            $.ajax({
                url: "/puzzle/AddMember",
                method: "POST",
                data: {
                    "memberId": $("#memberId").val(),
                    "memberPw": $("#memberPw").val()
                },
                success: function() {
                    location.href = "/puzzle/signIn.html";
                    return;
                }
            });
        },
        // 정보 수정
        editInfoBtnClick: function() {
            if ($("#newMemberPw").val() != $("#newMemberPw2").val()) {
                alert("입력하신 변경할 비밀번호가 서로 다릅니다 ! 다시 시도하여 주세요. ");
                return;
            }
            $.ajax({
                url: "/puzzle/UpdateMemberInfo",
                method: "POST",
                data: {
                    memberId: $("#memberId").val(),
                    memberPw: $("#memberPw").val(),
                    newMemberPw: $("#newMemberPw").val(),
                },
                success: function(json) {
                    alert(json);
                    return;
                }
            });
        },
        // 회원 탈퇴
        withDrawBtnClick: function() {
            if ($("#memberPw").val() == "") {
                alert("비밀번호를 입력해주세요!");
                return;
            }
            $.ajax({
                url: "/puzzle/WithdrawMember",
                method: "POST",
                data: {
                    "memberId": $("#memberId").val(),
                    "memberPw": $("#memberPw").val()
                },
                success: function() {
                    alert("⛔ 회원 탈퇴 완료 ⛔");
                    location.href = "/puzzle/index.html";
                    return false;
                },
                fail: function() {
                    alert("회원탈퇴를 완료 하지 못했습니다 !");
                },
            });
        }
    },
    mounted: function() {
        var $vm = this;

        // 로그인 확인
        $.ajax({
            url: "/puzzle/GetSessionInfo",
            async: false, // 동기요청
            method: "POST",
            success: function(json) {
                $vm.loginUser = json;
                console.log("sessionInfo : ", $vm.loginUser);
            }
        });

        var pathname = $(location).attr('pathname');

        if (pathname === '/puzzle/myPage.html') {
            if ($vm.loginUser == null) {
                alert("로그인을 하셔야 마이페이지를 이용할 수 있습니다!");
                location.href = "/puzzle/login.html";
                return;
            }

            // 나의 정보(id) 출력 
            $.ajax({
                url: "/puzzle/SelectMemberInfo",
                method: "POST",
                data: {
                    memberId: $vm.loginUser
                },
                success: function(json) {
                    $("#memberId").val(json);
                }
            });


        } else {
            if ($vm.loginUser === null) {
                $vm.loginUser = '손';
                $(".Logined").css("display", "none");
                $(".notLogin").css("display", "block");
            } else {
                $(".Logined").css("display", "block");
                $(".notLogin").css("display", "none");
            }
            $("#loginState").append("<b>" + $vm.loginUser + "</b>님 어서오세요!");
            console.log($vm.loginUser);
        }
    },

});