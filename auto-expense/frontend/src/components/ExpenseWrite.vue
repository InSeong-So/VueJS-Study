<template>
  <div class="container">
    <div class="py-5 text-center">
      <div class="row">
        <div class="col-sm-4 mb-3 text-center">
          <img class="d-block mx-auto mb-4" src="../assets/bootstrap.svg" alt="" width="72" height="72">
        </div>
        <div class="col-sm-4 mb-3 text-center">
          <img class="d-block mx-auto mb-4" src="../assets/vue.png" alt="" width="72" height="72">
        </div>
        <div class="col-sm-4 mb-3 text-center">
          <img class="d-block mx-auto mb-4" src="../assets/node.png" alt="" width="72" height="72">
        </div>
      </div>
      <br>
      <h2>익스펜스 쉽게 작성하기</h2>
      <p class="lead">매번 엑셀파일 고치기 귀찮아서 만드는 템플릿</p>
    </div>
    <div class="col-md-10" style="float: none;margin: 0 auto;">
      <form class="needs-validation" onsubmit="return false;">
        <hr class="mb-4">
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="username">이름</label>
            <input type="text" class="form-control" id="username" v-model="username" @blur="userCheck($event)">
          </div>
          <div class="col-md-4 mb-3">
            <label for="grades">직급</label>
            <select class="custom-select" id="grades" v-model="gradesSelected">
              <option v-for="grade in combo.grades" :value="grade">
                {{ grade }}
              </option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label for="projects">투입 프로젝트</label>
            <select class="custom-select" id="projects" v-model="projectsSelected">
              <option v-for="project in combo.projects" :value="project">
                {{ project }}
              </option>
            </select>
          </div>
        </div>
        <hr class="mb-4">
        <div class="row">
          <div class="col-sm-4 mb-3 text-center" id="loadCurrentInfo">
            <button type="button" class="btn btn-primary" @click="loadCurrentInfo()">
              저장한 최근 정보 가져오기
            </button>
          </div>
          <div class="col-sm-4 mb-3 text-center" id="exMonthUse" style="display:none;">
            <button type="button" class="btn btn-primary" disabled @click="">
              전월 사용내역 보기
            </button>
          </div>
          <div class="col-sm-4 mb-3 text-center">
            <button type="button" class="btn btn-primary active" data-toggle="modal" data-target="#myModal">
              사용내역 추가하기
            </button>
          </div>
          <div class="col-sm-4 mb-3 text-center">
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal">
              프로젝트 현황보기
            </button>
          </div>
        </div>

        <div class="row">
          <!-- The Modal -->
          <div class="modal fade" id="myModal">
            <div class="modal-dialog">
              <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                  <h4 class="modal-title">Modal Heading</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                  <div class="row mb-3">
                    <div class="col-md-4">
                      <label for="dates">날짜</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="dates" v-model="dates" placeholder="MMDD">
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label for="codes">코드</label>
                      <select name="codes" id="codes" v-model="codesSelected" class="custom-select">
                        <option v-for="code in codes" :value="code.codes_txt">
                          {{ code.codes_comment }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label for="amount">금액</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="amount" v-model="amount">
                        <div class="input-group-append">
                          <span class="input-group-text">원</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-md-12">
                      <label for="description">사용내역</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="description" v-model="description"
                               placeholder="Description">
                      </div>
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-md-12">
                      <label for="comment">비고</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="comment" v-model="notes"
                               placeholder="Comment">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                  <button @click="addUserDetails()" class="btn btn-primary" type="button">Add
                  </button>
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <hr class="mt-1" v-if="addYn === 'Y'">

        <div class="row" v-if="addYn === 'Y'">
          <div class="container">
            <table class="table table-hover table-sm table-bordered">
              <thead>
              <tr>
                <th zcope="col">No</th>
                <th scope="col">Date</th>
                <th scope="col">Code</th>
                <th scope="col">Description</th>
                <th scope="col">Amount</th>
                <th scope="col">Cost Center</th>
                <th scope="col">Comment</th>
                <th scope="col">Modify</th>
                <th scope="col">Delete</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(userDetail, userDetailIndex) in userDetails">
                <td><input type="text" class="form-control form-control-sm text-center border-0" :value="userDetailIndex+1"></td>
                <td><input type="text" class="form-control form-control-sm text-center border-0" :value="userDetail.dates"></td>
                <td><input type="text" class="form-control form-control-sm text-center border-0"
                           :value="userDetail.codesSelected"></td>
                <td><input type="text" class="form-control form-control-sm border-0" :value="userDetail.description"></td>
                <td><input type="text" class="form-control form-control-sm text-center border-0" :value="userDetail.amount"></td>
                <td><input type="text" class="form-control form-control-sm text-center border-0"
                           :value="userDetail.projectsSelected"></td>
                <td><input type="text" class="form-control form-control-sm border-0" :value="userDetail.notes"></td>
                <td>
                  <button class="btn btn-primary btn-sm" @click="rowModify(userDetailIndex+1)">수정</button>
                </td>
                <td>
                  <button class="btn btn-primary btn-sm" @click="rowDelete(userDetailIndex+1)">{{userDetailIndex === 0 ? '전체' : '삭제'}}</button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr class="mt-1">

        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="submitted">기안자</label>
            <div class="input-group">
              <input type="text" class="form-control" id="submitted" v-model="submitted" placeholder="Submitted by">
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="reviewed">결재자</label>
            <div class="input-group">
              <input type="text" class="form-control" id="reviewed" v-model="reviewed" placeholder="Reviewed by">
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <label for="approved">최종승인자</label>
            <div class="input-group">
              <input type="text" class="form-control" id="approved" v-model="approved" placeholder="Approved by">
            </div>
          </div>
        </div>

        <hr class="mb-4">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="save_info" value="Y" v-model="save_info">
          <label class="custom-control-label" for="save_info">작성자 정보를 저장하여 다음에도 사용하기</label>
        </div>
        <hr class="mb-4">

        <button class="btn btn-primary btn-lg btn-block" type="submit" @click="submitExpense()">Expense 작성
        </button>
      </form>
    </div>
    <footer class="my-5 pt-5 text-muted text-center text-small">
      <p class="mb-1">&copy; 2020 HCG Expense</p>
    </footer>
    <!--    <p>data: {{$data}}</p>-->
  </div>
</template>

<script>

  export default {
    name: 'ExpenseWrite',
    data: function () {
      return {
        initYn: "N",
        // idx: 1,
        username: '',
        userData: [],
        combo: [],
        codes: [],
        gradesSelected: "선택해주세요.",
        projectsSelected: "선택해주세요.",
        codesSelected: "선택해주세요.",
        userDetails: [],
        data_config: [],
        dates: '',
        description: '',
        amount: '',
        notes: '',
        submitted: '',
        reviewed: '',
        approved: '',
        save_info: '',
        addYn: '',
      }
    },
    methods: {
      vue_init: function () {
        if (this.initYn === "N") {
          this.$http.get('http://localhost:8226/api/dbs')
            .then((result) => {
              console.log("// created()");
              this.$set(this.combo, 'grades', result.data.grades_txt);
              this.codes = result.data.codes;
              this.$set(this.combo, 'projects', result.data.projects_txt);
              for (let i in result.data.data_config) {
                this.$set(this.data_config, i, result.data.data_config[i]);
              }
              console.log("created() //");
            });
          this.initYn = "Y";
        }
      },
      isEmpty: function (value) {
        if (value === "" || value === null || value === undefined) {
          return true;
        } else return typeof value === "object" && !Object.keys(value).length;
      },
      rowModify: function (rowIdx) {

      },
      rowDelete: function (rowIdx) {
        this.userDetails.splice(rowIdx - 1, 1);
        if (rowIdx - 1 === 0) {
          this.addYn = ''
        }
      },
      userCheck: function ($event) {
        this.username = $event.target.value;
        if (!this.isEmpty(this.username)) {
          this.$http.get('http://localhost:8226/api/userCheck', {
            params: {
              username: this.username,
              past_month: this.data_config.past_month
            }
          })
            .then((result) => {
              console.log("// userCheck()");
              if (result.data === null || result.data === undefined) {
                alert("데이터가 없어 새로 작성합니다.");
              } else {
                this.$set(this.userData, []);
                this.$set(this.userData, result.data);
                // this.$set(this.gradesSelected, this.userData.);
              }
              console.log("userCheck() //");
            });
        }
      }, loadCurrentInfo: function () {
        if (!this.username) {
          alert("이름을 입력해주세요.");
          $("#username").focus();
          return;
        } else {
          this.$http.get('http://localhost:8226/api/loadCurrentInfo', {
            params: {
              username: this.username
            }
          })
            .then((result) => {
              console.log("// loadCurrentInfo()");
              this.gradesSelected = result.data[0].GRADES;
              this.projectsSelected = result.data[0].PROJECTS;
              this.submitted = result.data[0].SUBMITTED;
              this.reviewed = result.data[0].REVIEWED;
              this.approved = result.data[0].APPROVED;
              console.log("loadCurrentInfo() //");
            });
        }
      },
      addUserDetails: function () {
        if (this.isEmpty(this.dates)) {
          alert("날짜 입력은 필수입니다.");
          return false;
        }
        if (this.isEmpty(this.codesSelected)) {
          alert("사용구분 입력은 필수입니다.");
          return false;
        }
        if (this.isEmpty(this.description)) {
          alert("사용내역 입력은 필수입니다.");
          return false;
        }
        if (this.isEmpty(this.amount)) {
          alert("사용금액 입력은 필수입니다.");
          return false;
        }
        // if (this.isEmpty(this.projectsSelected)) {
        //   alert("현 프로젝트 소속 입력은 필수입니다.");
        //   return false;
        // }

        // show 이벤트 플래그
        if (this.isEmpty(this.addYn)) {
          this.addYn = 'Y'
        }

        // 데이터에 추가
        this.userDetails.push({
          // idx: this.idx++,
          dates: this.dates,
          codesSelected: this.codesSelected,
          description: this.description,
          amount: this.amount,
          projectsSelected: this.projectsSelected,
          notes: this.notes
        });

        // 배열에 추가하고 초기화
        this.dates = '';
        this.codesSelected = '';
        // this.projectsSelected = '';
        this.amount = '';
        this.description = '';
        this.notes = '';
      },
      submitExpense: function () {
        // DB에 저장하겠다
        console.log(this.$data)
        this.$http.get('http://localhost:8226/api/submitExpense', {
          params: {
            objectData: this.$data
          }
        })
          .then((result) => {

          });
      }
    },
    beforeCreate() {

    },
    created() {
      this.vue_init();
    },
    mounted() {

    }
  }
</script>
