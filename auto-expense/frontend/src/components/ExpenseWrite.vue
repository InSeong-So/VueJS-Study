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
        <div class="row">
          <div class="col-md-4 mb-3">
            <label for="username">이름</label>
            <input type="text" class="form-control" id="username" v-model="username" @change="userCheck(username)">
          </div>
          <div class="col-md-4 mb-3">
            <label for="grades">직급</label>
            <form>
              <select class="custom-select" id="grades" v-model="combo.grades">
                <option v-for="grade in combo.grades">
                  {{ grade }}
                </option>
              </select>
            </form>
          </div>
          <div class="col-md-4 mb-3">
            <label for="projects">투입 프로젝트</label>
            <form>
              <select class="custom-select" id="projects" v-model="combo.projects">
                <option v-for="project in combo.projects">
                  {{ project }}
                </option>
              </select>
            </form>
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
                        <input type="text" class="form-control" id="dates" v-model="userDetails.dates"
                               placeholder="MMDD">
                        <div class="input-group-append">
                          <span class="input-group-text">@</span>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <label for="codes">코드</label>
                      <form>
                        <select name="codes" id="codes" v-model="combo.codes" class="custom-select">
                          <option v-for="code in combo.codes">
                            {{ code }}
                          </option>
                        </select>
                      </form>
                    </div>
                    <div class="col-md-4">
                      <label for="amount">금액</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="amount" v-model="userDetails.amount"
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
                        <input type="text" class="form-control" id="description" v-model="userDetails.description"
                               placeholder="Description">
                      </div>
                    </div>
                  </div>

                  <div class="row mb-3">
                    <div class="col-md-12">
                      <label for="comment">비고</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="comment" v-model="userDetails.comment"
                               placeholder="Comment">
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                  <button @click="addDescription(description)" class="btn btn-primary" data-dismiss="modal"
                          type="button">Add
                  </button>
                  <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                </div>

              </div>
            </div>
          </div>
        </div>

        <hr class="mt-1">

        <div class="row">
          <div class="container">
            <table class="table table-dark table-striped">
              <thead>
              <tr>
                <th>Date</th>
                <th>Code</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Cost Center</th>
                <th>Comment</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="userDetail in userDetails" v-if="userDetails != null">
                <td>{{userDetail.dates}}</td>
                <td>{{userDetail.codes}}</td>
                <td>{{userDetail.description}}</td>
                <td>{{userDetail.amount}}</td>
                <td>{{userDetail.comment}}</td>
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
          <input type="checkbox" class="custom-control-input" id="save-info">
          <label class="custom-control-label" for="save-info">Save this information for next time</label>
        </div>
        <hr class="mb-4">

        <button class="btn btn-primary btn-lg btn-block" type="submit" @click="submitExpense()">Expense 작성</button>
      </form>
    </div>
    <footer class="my-5 pt-5 text-muted text-center text-small">
      <p class="mb-1">&copy; 2020 HCG Expense</p>
    </footer>
  </div>
</template>

<script>
  export default {
    name: 'ExpenseWrite',
    data: function() {
      return {
        msg: '',
        username: '',
        combo: [

        ],
        userDetails: [],
        dates: '',
        description: '',
        amount: '',
        comment: '',
        submitted: '',
        reviewed: '',
        approved: '',
      }
    },
    methods: {
      vue_init: function () {
        let vm = this;
        this.$http.get('http://localhost:8226/api/dbs')
          .then((result) => {
            console.log("// created()");
            vm.$set(vm.combo, 'grades', result.data.grades_txt);
            vm.$set(vm.combo, 'projects', result.data.projects_txt);
            vm.$set(vm.combo, 'codes', result.data.codes_txt);
            console.log("created() //");
          });
      },
      userCheck: function (username) {
        let vm = this;
      },
      addDescription: function (description) {
        let vm = this;
      },
      submitExpense: function () {
        let vm = this;
      }
    },
    mounted() {
      this.vue_init();
    },
    destroyed() {
      console.log(this.combo);
    }
  }
</script>
