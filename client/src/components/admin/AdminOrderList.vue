<template>
	<div>
		<h3>AdminOrderList.vue</h3>
		<div class="container-xxl flex-grow-1 container-p-y">
			<div class="card">
				<div class="card-datatable table-responsive">
					<div id="DataTables_Table_0_wrapper" class="dataTables_wrapper dt-bootstrap5 no-footer">
						<div class="card-header d-flex flex-column flex-md-row align-items-start align-items-md-center">
							<div class="ms-n2">
								<div id="DataTables_Table_0_filter" class="dataTables_filter"><label><input type="search"
											class="form-control" placeholder="Search Order" aria-controls="DataTables_Table_0"></label></div>
							</div>
							<div class="d-flex align-items-md-center justify-content-md-end mt-2 mt-md-0">
								<div class="dataTables_length mt-0 mt-md-3 me-3" id="DataTables_Table_0_length"><label><select
											name="DataTables_Table_0_length" aria-controls="DataTables_Table_0" class="form-select">
											<option value="10">10</option>
											<option value="40">40</option>
											<option value="60">60</option>
											<option value="80">80</option>
											<option value="100">100</option>
										</select></label></div>
								<div class="dt-action-buttons pt-0">
									<div class="dt-buttons btn-group flex-wrap">
										<div class="btn-group"><button class="btn buttons-collection dropdown-toggle btn-label-secondary"
												tabindex="0" aria-controls="DataTables_Table_0" type="button" aria-haspopup="dialog"
												aria-expanded="false"><span><i class="bx bx-export me-1"></i>Export</span></button></div>
									</div>
								</div>
							</div>
						</div>
						<table class="datatables-order table border-top dataTable no-footer dtr-column collapsed"
							id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" style="width: 100%;">
							<thead>
								<tr>

									<th class="sorting_disabled dt-checkboxes-cell dt-checkboxes-select-all" rowspan="1" colspan="1"
										style="width: 10%;" data-col="1" aria-label=""><input type="checkbox" class="form-check-input"></th>
									<th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
										style="width: 10%;" aria-label="order: activate to sort column ascending">order</th>
									<th class="sorting sorting_desc" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1"
										colspan="1" style="width: 10%;" aria-label="date: activate to sort column ascending"
										aria-sort="descending">date
									</th>
									<th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
										style="width: 10%;" aria-label="customers: activate to sort column ascending">customers</th>
									<th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
										style="width: 10%;" aria-label="payment: activate to sort column ascending">payment</th>
									<th class="sorting" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
										style="width: 10%;" aria-label="status: activate to sort column ascending">status</th>
									<th class="sorting dtr-hidden" tabindex="0" aria-controls="DataTables_Table_0" rowspan="1" colspan="1"
										style="width: 10%; display: none;" aria-label="method: activate to sort column ascending">method
									</th>
									<th class="sorting_disabled dtr-hidden" rowspan="1" colspan="1" style="width: 79px; display: none;"
										aria-label="Actions">Actions</th>
								</tr>
							</thead>
							<tbody>
								<tr class="odd">
									<td class="  dt-checkboxes-cell"><input type="checkbox" class="dt-checkboxes form-check-input"></td>
									<td class=""><a href="app-ecommerce-order-details.html"><span class="fw-medium">#6265</span></a></td>
									<td class="sorting_1"><span class="text-nowrap">Sep 7, 2022, 5:58 </span></td>
									<td>
										<div class="d-flex justify-content-start align-items-center order-name text-nowrap">
											<div class="avatar-wrapper">
												<div class="avatar me-2"><span class="avatar-initial rounded-circle bg-label-primary">CB</span>
												</div>
											</div>
											<div class="d-flex flex-column">
												<h6 class="m-0"><a href="pages-profile-user.html" class="text-body">Clarice Biesty</a></h6>
												<small class="text-muted">cbiesty29@hp.com</small>
											</div>
										</div>
									</td>
									<td class="">
										<h6 class="mb-0 w-px-100 text-warning"><i class="bx bxs-circle fs-tiny me-2"></i>Pending</h6>
									</td>
									<td><span class="badge px-2 bg-label-info" text-capitalized="">Ready to Pickup</span></td>
									<td class="dtr-hidden" style="display: none;">
										<div class="d-flex align-items-center text-nowrap"><span><i
													class="bx bx-dots-horizontal-rounded"></i>@gmail.com</span></div>
									</td>
									<td class="dtr-hidden" style="display: none;">
										<div class="d-flex justify-content-sm-center align-items-sm-center"><button
												class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i
													class="bx bx-dots-vertical-rounded"></i></button>
											<div class="dropdown-menu dropdown-menu-end m-0"><a href="app-ecommerce-order-details.html"
													class="dropdown-item">View</a><a href="javascript:0;"
													class="dropdown-item delete-record">Delete</a></div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="row mx-2">
							<div class="col-sm-12 col-md-6">
								<div class="dataTables_info" id="DataTables_Table_0_info" role="status" aria-live="polite">Displaying 1
									to
									10 of 100 entries</div>
							</div>
							<div class="col-sm-12 col-md-6">
								<div class="dataTables_paginate paging_simple_numbers" id="DataTables_Table_0_paginate">
									<ul class="pagination">
										<li class="paginate_button page-item previous disabled" id="DataTables_Table_0_previous"><a
												aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="previous"
												tabindex="-1" class="page-link">Previous</a></li>
										<li class="paginate_button page-item active"><a href="#" aria-controls="DataTables_Table_0"
												role="link" aria-current="page" data-dt-idx="0" tabindex="0" class="page-link">1</a></li>
										<li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link"
												data-dt-idx="1" tabindex="0" class="page-link">2</a></li>
										<li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link"
												data-dt-idx="2" tabindex="0" class="page-link">3</a></li>
										<li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link"
												data-dt-idx="3" tabindex="0" class="page-link">4</a></li>
										<li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link"
												data-dt-idx="4" tabindex="0" class="page-link">5</a></li>
										<li class="paginate_button page-item disabled" id="DataTables_Table_0_ellipsis"><a
												aria-controls="DataTables_Table_0" aria-disabled="true" role="link" data-dt-idx="ellipsis"
												tabindex="-1" class="page-link">…</a></li>
										<li class="paginate_button page-item "><a href="#" aria-controls="DataTables_Table_0" role="link"
												data-dt-idx="9" tabindex="0" class="page-link">10</a></li>
										<li class="paginate_button page-item next" id="DataTables_Table_0_next"><a href="#"
												aria-controls="DataTables_Table_0" role="link" data-dt-idx="next" tabindex="0"
												class="page-link">Next</a></li>
									</ul>
								</div>
							</div>
						</div>
						<div style="width: 1%;"></div>
					</div>
				</div>
			</div>
			<PaginationComp />
		</div>
	</div>
</template>

<script>
import PaginationComp from '../PaginationComp.vue';

export default {
	components: { PaginationComp }
};
</script>