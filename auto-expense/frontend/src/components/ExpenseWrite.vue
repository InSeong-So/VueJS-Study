<template>
  <div class="container">
    <div class="py-5 text-center">
      <div class="row">
        <div class="col-md-4 mb-3 text-center">
          <img class="d-block mx-auto mb-4" src="../assets/bootstrap.svg" alt="" width="72" height="72">
        </div>
        <div class="col-md-4 mb-3 text-center">
          <img class="d-block mx-auto mb-4" src="../assets/vue.png" alt="" width="72" height="72">
        </div>
        <div class="col-md-4 mb-3 text-center">
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
          <div class="col-md-3 mb-3">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">이름</span>
              </div>
              <input type="text" class="form-control" ref="username" id="username" v-model="username">
            </div>
          </div>
          <div class="col-md-3 mb-3 text-center">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">입력할 달</span>
              </div>
              <select class="custom-select mr-sm-2" v-model="curMonth" id="monthSelect"
                      @change="monthChange($event)">
                <option disabled value="">선택</option>
                <option value="01">1월</option>
                <option value="02">2월</option>
                <option value="03">3월</option>
                <option value="04">4월</option>
                <option value="05">5월</option>
                <option value="06">6월</option>
                <option value="07">7월</option>
                <option value="08">8월</option>
                <option value="09">9월</option>
                <option value="10">10월</option>
                <option value="11">11월</option>
                <option value="12">12월</option>
              </select>
            </div>
          </div>
          <div class="col-md-3 mb-3 text-center" id="loadCurrentInfo">
            <button type="button" class="btn btn-primary" @click="loadCurrentInfo()">
              최근 데이터 불러오기
            </button>
          </div>
          <div class="col-md-3 mb-3 text-center" id="loadAllSaveInfo">
            <button type="button" class="btn btn-primary" @click="loadAllSaveInfo()" data-toggle="modal"
                    data-target="#myModal3">
              저장된 총 내역 확인하기
            </button>
          </div>
        </div>

        <!-- 프로젝트현황 -->
        <div class="row">
          <!-- The Modal -->
          <div class="modal fade" id="myModal3">
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
                    <div class="col-md-12">
                      <label for="tempbody2">비고</label>
                      <div class="list-group" id="tempbody2" name="tempbody2">
                        <a href="#" v-for="userSaveData in userData"
                           class="list-group-item list-group-item-action list-group-item-light"></a>
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

        <hr class="mb-4">
        <div class="row">
          <div class="col-md-3 mb-3">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">직급</span>
              </div>
              <select class="custom-select" id="grades" v-model="gradesSelected">
                <option disabled value="">선택</option>
                <option v-for="grade in combo.grades" :value="grade">
                  {{ grade }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">CostCenter</span>
              </div>
              <select class="custom-select" id="projects" v-model="projectsSelected">
                <option disabled value="">선택</option>
                <option v-for="project in combo.projects" :value="project">
                  {{ project }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-md-2 mb-3 text-center">
            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal2">
              프로젝트현황
            </button>
          </div>
          <div class="col-md-3 mb-3 text-center">
            <button type="button" class="btn btn-primary active" data-toggle="modal" data-target="#myModal">
              사용 내역 추가하기
            </button>
          </div>
        </div>

        <!-- 프로젝트현황 -->
        <div class="row">
          <!-- The Modal -->
          <div class="modal fade" id="myModal2">
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
                    <div class="col-md-12">
                      <label for="tempbody">비고</label>
                      <div class="list-group" id="tempbody" name="tempbody">
                        <a href="#" class="list-group-item list-group-item-action list-group-item-light">This is a light
                          list group item</a>
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

        <!-- 사용 내역 추가하기 -->
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
                        <input type="text" class="form-control" ref="dates" id="dates" v-model="dates"
                               placeholder="MMDD"
                               @blur="regexMonth($event)">
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label for="codes">코드</label>
                      <select name="codes" id="codes" v-model="codesSelected" class="custom-select">
                        <option disabled value="">선택</option>
                        <option v-for="code in codes" :value="code.codes_txt">
                          {{ code.codes_comment }}
                        </option>
                      </select>
                    </div>
                    <div class="col-md-4">
                      <label for="amount">금액</label>
                      <div class="input-group">
                        <input type="number" class="form-control" id="amount" v-model="amount">
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
                <th scope="col">Delete</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(userDetail, userDetailIndex) in userDetails">
                <td><input type="text" class="form-control form-control-sm text-center border-0"
                           v-bind:readonly="isReadonly"
                           :value="userDetailIndex+1" @blur="dataReadonly" @dblclick="dataModify"></td>
                <td><input type="text" class="form-control form-control-sm text-center border-0"
                           v-bind:readonly="isReadonly"
                           :value="userDetail.dates" @blur="dataReadonly" @dblclick="dataModify"></td>
                <td>
                  <select class="custom-select" v-model="userDetail.codesSelected" v-bind:disabled="isDisabled"
                          :value="userDetail.codesSelected" @blur="dataReadonly" @dblclick="dataModify">
                    <option disabled value="">선택</option>
                    <option v-for="code in codes" :value="code.codes_txt">
                      {{ code.codes_comment }}
                    </option>
                  </select>
                </td>
                <td><input type="text" class="form-control form-control-sm border-0" :value="userDetail.description"
                           v-bind:readonly="isReadonly" @blur="dataReadonly" @dblclick="dataModify">
                </td>
                <td><input type="text" class="form-control form-control-sm text-center border-0"
                           v-bind:readonly="isReadonly"
                           :value="userDetail.amount" @blur="dataReadonly" @dblclick="dataModify"></td>
                <td>
                  <select class="custom-select" v-bind:disabled="isDisabled" :value="userDetail.projectsSelected"
                          v-model="userDetail.projectsSelected" @blur="dataReadonly" @dblclick="dataModify">
                    <option disabled value="">선택</option>
                    <option v-for="project in combo.projects" :value="project">
                      {{ project }}
                    </option>
                  </select>
                </td>

                <td><input type="text" class="form-control form-control-sm border-0"
                           v-bind:readonly="isReadonly" :value="userDetail.notes" @blur="dataReadonly"
                           @dblclick="dataModify">
                </td>
                <td>
                  <button class="btn btn-primary btn-sm" @click="rowDelete(userDetail, userDetailIndex)">삭제</button>
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
          <input type="checkbox" class="custom-control-input" id="save_info" value="Y" v-model="save_info"
                 v-bind:checked="save_info">
          <label class="custom-control-label" for="save_info">작성자 정보를 저장하여 다음에도 사용하기</label>
        </div>
        <hr class="mb-4">

        <button class="btn btn-primary btn-lg btn-block" type="submit" @click="submitExpense()">Expense 작성
        </button>
      </form>
    </div>
    <footer class="my-4 text-muted text-center text-small">
      <p class="mb-1">&copy; 2020 HCG Expense v1.0</p>
    </footer>
  </div>
</template>

<script>

  export default {
    name: 'ExpenseWrite',
    data: function () {
      return {
        records: [],
        initYn: "N",
        username: '',
        userData: [],
        combo: [],
        codes: [],
        gradesSelected: '',
        projectsSelected: '',
        codesSelected: '',
        userDetails: [],
        data_config: [],
        exMonth: '',
        curMonth: '',
        dates: '',
        description: '',
        amount: '',
        notes: '',
        submitted: '',
        reviewed: '',
        approved: '',
        save_info: false,
        addYn: '',
        isReadonly: true,
        isDisabled: true,
      }
    },
    methods: {
      vue_init: function () {
        if (this.initYn === "N") {
          this.$http.get('http://localhost:8226/api/dbs')
            .then((result) => {
              console.log("// created()");
              this.$set(this.combo, 'grades', result.data.grades_txt);
              this.$set(this, 'codes', result.data.codes);
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
      monthChange: function ($event) {
        this.$set(this, 'curMonth', $event.target.value);
        let tempMonth = this.curMonth - 1;
        if (tempMonth < 10 && tempMonth !== 0) {
          this.$set(this, 'exMonth', "0" + tempMonth);
        } else if (tempMonth === 0) {
          this.$set(this, 'exMonth', "12");
        }
      },
      regexMonth: function (event) {
        const regexM = /(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[0-1])/;
        const tempM = event.target.value;
        if (tempM !== '') {
          if (regexM.test(tempM)) {
            this.$set(this, 'dates', tempM);
          } else {
            this.$set(this, 'dates', '');
            this.$refs.dates.focus();
            alert("날짜형식이 맞지 않습니다.\nMMDD 형식으로 입력해주세요.");
          }
        }
      },
      dataModify: function () {
        this.$set(this, 'isReadonly', false);
        this.$set(this, 'isDisabled', false);
      },
      dataReadonly: function () {
        this.$set(this, 'isReadonly', true);
        this.$set(this, 'isDisabled', true);
      },
      rowDelete: function (userDetail, rowIdx) {
        this.userDetails.splice(rowIdx, 1);
        if (rowIdx - 1 === 0) {
          this.$set(this, 'addYn', '');
        }
      },
      allProjects: function () {

      },
      loadCurrentInfo: function () {
        if (!this.username) {
          alert("이름을 입력해주세요.");
          this.$refs.username.focus();
          return;
        } else if (!this.curMonth) {
          alert("입력할 달을 선택한 뒤 최근 저장 입력 정보를 확인하세요.");
          return;
        } else {
          this.$set(this, 'gradesSelected', '');
          this.$set(this, 'projectsSelected', '');
          this.$set(this, 'submitted', '');
          this.$set(this, 'reviewed', '');
          this.$set(this, 'approved', '');

          this.$set(this, 'userDetails', []);
          this.$set(this, 'addYn', '');

          this.$http.defaults.headers.post['Content-Type'] = 'application/json';
          this.$http.post('http://localhost:8226/api/loadCurrentInfo', {
            username: this.username,
            ud: this.curMonth
          })
            .then((result) => {
              console.log("// loadCurrentInfo()");
              if (result.data.success) {
                this.$set(this, 'gradesSelected', result.data.data1[0].gradesSelected);
                this.$set(this, 'projectsSelected', result.data.data1[0].projectsSelected);
                this.$set(this, 'submitted', result.data.data1[0].submitted);
                this.$set(this, 'reviewed', result.data.data1[0].reviewed);
                this.$set(this, 'approved', result.data.data1[0].approved);

                this.$set(this, 'userDetails', result.data.data2);
                this.$set(this, 'addYn', 'Y');
              } else {
                alert("조회된 자료가 없으므로 새로 작성합니다.");
              }
              console.log("loadCurrentInfo() //");
            });
        }
      },
      loadAllSaveInfo: function () {
        this.$http.defaults.headers.post['Content-Type'] = 'application/json';
        this.$http.post('http://localhost:8226/api/loadAllSaveInfo', {
          username: this.username
        })
          .then((result) => {
            if (result.data.success) {

            } else {
              alert("불러올 내역이 존재하지 않습니다.");
            }
          });
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

        // show 이벤트 플래그
        if (this.isEmpty(this.addYn)) {
          this.$set(this, 'addYn', 'Y');
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
        this.$set(this, 'dates', '');
        this.$set(this, 'codesSelected', '');
        this.$set(this, 'amount', '');
        this.$set(this, 'description', '');
        this.$set(this, 'notes', '');
      },
      submitExpense: function () {
        // DB에 저장하겠다
        this.$http.defaults.headers.post['Content-Type'] = 'application/json';
        this.$http.post('http://localhost:8226/api/submitExpense', {
          objectData: this.$data
        })
          .then((result) => {
            // DB 저장에 성공하면 입력박스 초기화
            if (result.data.success) {
              location.reload();
            }
          });

        // 엑셀 다운로드 로직
        // this.$http.get('http://localhost:8226/download', {
        //   responseType: 'blob'
        // })
        //   .then((result) => {
        //     console.log(result)
        //     const url = window.URL.createObjectURL(new Blob([result.data], {type: result.headers['content-type']}));
        //     const link = document.createElement('a');
        //     link.href = url;
        //     link.setAttribute('download', 'test.xlsx');
        //     document.body.appendChild(link);
        //     link.click();
        //   });
      }
    },
    beforeCreate() {

    },
    created() {
      // this.fetchData(token);

      this.vue_init();
    },
    mounted() {

    }
  }
</script>
