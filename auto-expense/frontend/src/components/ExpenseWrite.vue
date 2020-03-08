<template>
  <div class="container">
    <div class="py-5 text-center">
      <div class="row">
        <img class="d-block mx-auto mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
             alt="" width="72" height="72">
        <img class="d-block mx-auto mb-4" src="../assets/logo.png" alt="" width="72" height="72">
      </div>
      <h2>익스펜스 쉽게 작성하기</h2>
      <p class="lead">매번 엑셀파일 고치기 귀찮아서 만드는 템플릿</p>
    </div>
    <div class="col-md-10" style="float: none;margin: 0 auto;">
      <form class="needs-validation" onsubmit="return false;">
        <hr class="mb-4">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" class="custom-control-input" id="load_info" value="Y">
          <label class="custom-control-label" for="load_info">정보 가져오기</label>
        </div>
        <!--        <div class="custom-control custom-checkbox">-->
        <!--          <input type="checkbox" class="custom-control-input" id="what_month" value="Y">-->
        <!--          <label class="custom-control-label" for="what_month">정보 가져오기</label>-->
        <!--        </div>-->
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
          <div class="col-sm-4 mb-3 text-center">
            <!-- Button to Open the Modal -->
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" disabled>
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
                        <input type="text" class="form-control" id="dates" v-model="dates"
                               placeholder="MMDD">
                        <div class="input-group-append">
                          <span class="input-group-text">@</span>
                        </div>
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
                        <input type="text" class="form-control" id="amount" v-model="amount"
                               placeholder="Amount">
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

        <hr class="mt-1" v-if="userDetails.addYn === 'Y'">

        <div class="row" v-if="userDetails.addYn === 'Y'">
          <div class="container">
            <table class="table table-dark table-striped">
              <thead>
              <tr>
                <th>No</th>
                <th>Date</th>
                <th>Code</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Cost Center</th>
                <th>Comment</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="userDetail in userDetails">
                <td>{{userDetail.idx}}</td>
                <td>{{userDetail.dates}}</td>
                <td>{{userDetail.codesSelected}}</td>
                <td>{{userDetail.description}}</td>
                <td>{{userDetail.amount}}</td>
                <td>{{userDetail.projectsSelected}}</td>
                <td>{{userDetail.notes}}</td>
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
          <input type="checkbox" class="custom-control-input" id="save_info" value="Y">
          <label class="custom-control-label" for="save_info">작성자 정보를 저장하여 다음에도 사용하기</label>
        </div>
        <hr class="mb-4">

        <button class="btn btn-primary btn-lg btn-block" type="submit" @click="submitExpense($event)">Expense 작성
        </button>
      </form>
    </div>
    <footer class="my-5 pt-5 text-muted text-center text-small">
      <p class="mb-1">&copy; 2020 HCG Expense</p>
    </footer>
    <p>data: {{$data}}</p>
  </div>
</template>

<script>

  export default {
    name: 'ExpenseWrite',
    data: function () {
      return {
        expense_form: [],
        idx: 1,
        msg: '',
        username: '',
        userData: [],
        combo: [],
        codes:[],
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
      }
    },
    methods: {
      vue_init: function () {
      },
      isEmpty: function (value) {
        if (value === "" || value === null || value === undefined) {
          return true;
        } else return typeof value === "object" && !Object.keys(value).length;
      },
      userCheck: function ($event) {
        let vm = this;
        this.username = $event.target.value;
        if (this.username !== null) {
          this.$http.get('http://localhost:8226/api/userCheck')
            .then((result) => {
              console.log("// userCheck()");
              if (result.data === null || result.data === undefined) {
                alert("데이터가 없어 새로 작성합니다.");
              } else {
                vm.$set(vm.userData, result.data);
                console.log(vm.userData);
                // vm.$set(vm.gradesSelected, vm.userData.);
              }
              console.log("userCheck() //");
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
        if (this.isEmpty(this.projectsSelected)) {
          alert("현 프로젝트 소속 입력은 필수입니다.");
          return false;
        }

        if (this.isEmpty(this.userDetails.addYn)) {
          this.userDetails.addYn = 'Y'
        }

        this.userDetails.push({
          idx: this.idx++,
          dates: this.dates,
          codesSelected: this.codesSelected,
          description: this.description,
          amount: this.amount,
          projectsSelected: this.projectsSelected,
          notes: this.notes
        });

        this.dates = '';
        this.codesSelected = '';
        this.amount = '';
        this.description = '';
        this.notes = '';
      },
      submitExpense: function ($event) {
        // const formData = new FormData(this.$refs['form']); // reference to form element
        // const data = {}; // need to convert it before using not with XMLHttpRequest
        // for (let [key, val] of formData.entries()) {
        //   Object.assign(data, {[key]: val})
        // }
        // console.log(data);
        // axios.post('https://jsonplaceholder.typicode.com/posts', data)
        //   .then(res => console.log(res.request.response))
      }
    },
    beforeCreate() {

    },
    created() {
      let vm = this;
      this.$http.get('http://localhost:8226/api/dbs')
        .then((result) => {
          console.log("// created()");
          console.log(result.data);
          vm.$set(vm.combo, 'grades', result.data.grades_txt);
          vm.codes.push({
            codes_txt: result.data.codes_txt,
            codes_comment: result.data.codes_comment
          });
          vm.$set(vm.combo, 'projects', result.data.projects_txt);

          for (let i in result.data.data_config) {
            vm.$set(vm.data_config, i, result.data.data_config[i]);
          }
          console.log("created() //");
        });
    },
    mounted() {
      let vm = this;
    }
  }
</script>
