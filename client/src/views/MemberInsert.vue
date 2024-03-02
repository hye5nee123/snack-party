<template>
  <!-- Single Page Header start -->
  <div class="container-fluid page-header py-5">
  <h1 class="text-center text-white display-6">회원가입</h1>
  <ol class="breadcrumb justify-content-center mb-0">
      <li class="breadcrumb-item"><a href="/">Home</a></li>
      <li class="breadcrumb-item active text-white">Sign Up</li>
  </ol>
</div>
<!-- Single Page Header End -->


<!-- Checkout Page Start -->
<div class="container-fluid py-5">
  <div class="container py-5">
      <form action="#">
          <div class="row g-5 center">
              <div class="col-md-12 col-lg-6 col-xl-7">
                  <div class="row">
                      <div class="col-md-12 col-lg-6">
                          <div class="form-item w-100">
                              <label class="bold">아이디<sup>*</sup></label>
                              <input type="text" class="form-control">
                              <p class="form-label">5~20자, 영문 소문자, 숫자만 사용 가능</p>
                          </div>
                      </div>
                      <div class="col-md-12 col-lg-6 my-3">
                          <div class="form-item w-100 my-3">
                              <!-- <label class="form-label my-3">Last Name<sup>*</sup></label> -->
                              <button type="button" class="btn border-secondary px-4 text-primary">중복확인</button>
                          </div>
                      </div>
                  </div>
                  <div class="form-item col-lg-6">
                      <label class="bold">비밀번호<sup>*</sup></label>
                      <input type="password" class="form-control">
                      <p class="form-label">8~16자, 영문 대/소문자, 숫자, 특수문자(~!@#$%^&*)만 사용 가능</p>
                  </div>
                  <div class="form-item col-lg-6 my-3">
                      <label class="bold">비밀번호 확인<sup>*</sup></label>
                      <input type="password" class="form-control">
                  </div>
                  <div class="form-item col-lg-6 my-3">
                      <label class="bold">이름<sup>*</sup></label>
                      <input type="text" class="form-control">
                  </div>
                  <div class="form-item col-lg-6 my-3">
                      <label class="bold">휴대전화<sup>*</sup></label>
                      <input type="text" class="form-control" placeholder="'-'없이 숫자만 입력">
                  </div>
                  <div class="form-item col-lg-6 my-3">
                      <label class="bold">이메일<sup>*</sup></label>
                      <input type="text" class="form-control">
                  </div>
                  <div class="row">
                      <div class="col-md-12 col-lg-6">
                          <div class="form-item w-100">
                              <label class="bold">생년월일<sup></sup></label>
                              <input type="text" class="form-control" placeholder="생년월일 8자리">
                          </div>
                      </div>
                      <div class="col-md-12 col-lg-6">
                          <div class="form-item w-100">
                              <label class="bold">성별<sup></sup></label><br>
                                <input type="radio" class="btn-check" name="gender" id="btnradio1" checked autocomplete="off" />
                                <label class="btn btn-outline-primary margin-right" for="btnradio1">남</label>
                                <input type="radio" class="btn-check" name="gender" id="btnradio2" autocomplete="off" />
                                <label class="btn btn-outline-primary" for="btnradio2">여</label>
                          </div>
                      </div>
                  </div>
                  <div class="row">
                      <div class="col-md-12 col-lg-6 my-3">
                          <div class="form-item w-100">
                              <label class="bold">기본주소<sup>*</sup></label>
                              <input type="text" class="form-control">
                          </div>
                      </div>
                      <div class="col-md-12 col-lg-6">
                          <div class="form-item w-100">
                              <!-- <label class="form-label my-3">Last Name<sup>*</sup></label> --><br><br>
                              <button type="button" class="btn border-secondary px-4 text-primary">우편번호 검색</button>
                          </div>
                      </div>
                  </div>












                  <div class="form-item">
                      <label class="form-label my-3">주소<sup>*</sup></label>
                      <input type="text" class="form-control" placeholder="House Number Street Name">
                  </div>
                  <div class="form-item">
                      <label class="form-label my-3">Town/City<sup>*</sup></label>
                      <input type="text" class="form-control">
                  </div>
                  <div class="form-item">
                      <label class="form-label my-3">Country<sup>*</sup></label>
                      <input type="text" class="form-control">
                  </div>
                  <div class="form-item">
                      <label class="form-label my-3">Postcode/Zip<sup>*</sup></label>
                      <input type="text" class="form-control">
                  </div>
                  <div class="form-item">
                      <label class="form-label my-3">Mobile<sup>*</sup></label>
                      <input type="tel" class="form-control">
                  </div>
                  <div class="form-item">
                      <label class="form-label my-3">Email Address<sup>*</sup></label>
                      <input type="email" class="form-control">
                  </div>
                  <div class="form-check my-3">
                      <input type="checkbox" class="form-check-input" id="Account-1" name="Accounts" value="Accounts">
                      <label class="form-check-label" for="Account-1">Create an account?</label>
                  </div>
                  <hr>
                  <div class="form-check my-3">
                      <input class="form-check-input" type="checkbox" id="Address-1" name="Address" value="Address">
                      <label class="form-check-label" for="Address-1">Ship to a different address?</label>
                  </div>
                  <div class="form-item">
                      <textarea name="text" class="form-control" spellcheck="false" cols="30" rows="11" placeholder="Oreder Notes (Optional)"></textarea>
                  </div>
                  <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                      <button type="button" class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">가입신청</button>
                  </div>
              </div>
              <!-- <div class="col-md-12 col-lg-6 col-xl-5">
                  <div class="table-responsive">
                      <table class="table">
                          <thead>
                              <tr>
                                  <th scope="col">Products</th>
                                  <th scope="col">Name</th>
                                  <th scope="col">Price</th>
                                  <th scope="col">Quantity</th>
                                  <th scope="col">Total</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                  <th scope="row">
                                      <div class="d-flex align-items-center mt-2">
                                          <img src="img/vegetable-item-2.jpg" class="img-fluid rounded-circle" style="width: 90px; height: 90px;" alt="">
                                      </div>
                                  </th>
                                  <td class="py-5">Awesome Brocoli</td>
                                  <td class="py-5">$69.00</td>
                                  <td class="py-5">2</td>
                                  <td class="py-5">$138.00</td>
                              </tr>
                              <tr>
                                  <th scope="row">
                                      <div class="d-flex align-items-center mt-2">
                                          <img src="img/vegetable-item-5.jpg" class="img-fluid rounded-circle" style="width: 90px; height: 90px;" alt="">
                                      </div>
                                  </th>
                                  <td class="py-5">Potatoes</td>
                                  <td class="py-5">$69.00</td>
                                  <td class="py-5">2</td>
                                  <td class="py-5">$138.00</td>
                              </tr>
                              <tr>
                                  <th scope="row">
                                      <div class="d-flex align-items-center mt-2">
                                          <img src="img/vegetable-item-3.png" class="img-fluid rounded-circle" style="width: 90px; height: 90px;" alt="">
                                      </div>
                                  </th>
                                  <td class="py-5">Big Banana</td>
                                  <td class="py-5">$69.00</td>
                                  <td class="py-5">2</td>
                                  <td class="py-5">$138.00</td>
                              </tr>
                              <tr>
                                  <th scope="row">
                                  </th>
                                  <td class="py-5"></td>
                                  <td class="py-5"></td>
                                  <td class="py-5">
                                      <p class="mb-0 text-dark py-3">Subtotal</p>
                                  </td>
                                  <td class="py-5">
                                      <div class="py-3 border-bottom border-top">
                                          <p class="mb-0 text-dark">$414.00</p>
                                      </div>
                                  </td>
                              </tr>
                              <tr>
                                  <th scope="row">
                                  </th>
                                  <td class="py-5">
                                      <p class="mb-0 text-dark py-4">Shipping</p>
                                  </td>
                                  <td colspan="3" class="py-5">
                                      <div class="form-check text-start">
                                          <input type="checkbox" class="form-check-input bg-primary border-0" id="Shipping-1" name="Shipping-1" value="Shipping">
                                          <label class="form-check-label" for="Shipping-1">Free Shipping</label>
                                      </div>
                                      <div class="form-check text-start">
                                          <input type="checkbox" class="form-check-input bg-primary border-0" id="Shipping-2" name="Shipping-1" value="Shipping">
                                          <label class="form-check-label" for="Shipping-2">Flat rate: $15.00</label>
                                      </div>
                                      <div class="form-check text-start">
                                          <input type="checkbox" class="form-check-input bg-primary border-0" id="Shipping-3" name="Shipping-1" value="Shipping">
                                          <label class="form-check-label" for="Shipping-3">Local Pickup: $8.00</label>
                                      </div>
                                  </td>
                              </tr>
                              <tr>
                                  <th scope="row">
                                  </th>
                                  <td class="py-5">
                                      <p class="mb-0 text-dark text-uppercase py-3">TOTAL</p>
                                  </td>
                                  <td class="py-5"></td>
                                  <td class="py-5"></td>
                                  <td class="py-5">
                                      <div class="py-3 border-bottom border-top">
                                          <p class="mb-0 text-dark">$135.00</p>
                                      </div>
                                  </td>
                              </tr>
                          </tbody>
                      </table>
                  </div>
                  <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                      <div class="col-12">
                          <div class="form-check text-start my-3">
                              <input type="checkbox" class="form-check-input bg-primary border-0" id="Transfer-1" name="Transfer" value="Transfer">
                              <label class="form-check-label" for="Transfer-1">Direct Bank Transfer</label>
                          </div>
                          <p class="text-start text-dark">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                      </div>
                  </div>
                  <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                      <div class="col-12">
                          <div class="form-check text-start my-3">
                              <input type="checkbox" class="form-check-input bg-primary border-0" id="Payments-1" name="Payments" value="Payments">
                              <label class="form-check-label" for="Payments-1">Check Payments</label>
                          </div>
                      </div>
                  </div>
                  <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                      <div class="col-12">
                          <div class="form-check text-start my-3">
                              <input type="checkbox" class="form-check-input bg-primary border-0" id="Delivery-1" name="Delivery" value="Delivery">
                              <label class="form-check-label" for="Delivery-1">Cash On Delivery</label>
                          </div>
                      </div>
                  </div>
                  <div class="row g-4 text-center align-items-center justify-content-center border-bottom py-3">
                      <div class="col-12">
                          <div class="form-check text-start my-3">
                              <input type="checkbox" class="form-check-input bg-primary border-0" id="Paypal-1" name="Paypal" value="Paypal">
                              <label class="form-check-label" for="Paypal-1">Paypal</label>
                          </div>
                      </div>
                  </div>
                  <div class="row g-4 text-center align-items-center justify-content-center pt-4">
                      <button type="button" class="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary">Place Order</button>
                  </div>
              </div> -->
          </div>
      </form>
  </div>
</div>
<!-- Checkout Page End -->
</template>

<script>
export default {
    name: 'LoginForm'
}
</script>