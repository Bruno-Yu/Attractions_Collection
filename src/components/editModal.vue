<template>
  <div
    class="modal fade"
    id="placeModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editModal"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header ">
          <h5 class="modal-title" id="editModal">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  v-model="tempPlace.name"
                  placeholder="請輸入名稱"
                />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label"><span v-if="isNew">新增</span>
            <span v-else>編輯</span>圖片網址</label>
                <input
                  type="text"
                  class="form-control"
                  id="image"
                  v-model="tempPlace.image"
                  placeholder="請輸入圖片連結"
                />
              </div>
              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    type="text"
                    class="form-control"
                    id="category"
                    v-model="tempPlace.category"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">評價</label>
                  <input
                    type="text"
                    class="form-control"
                    id="unit"
                    v-model="tempPlace.GoogleRate"
                    placeholder="請輸入 Google 上的評價"
                  />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col">
                  <label for="origin_price" class="form-label">地址</label>
                  <input
                    type="number"
                    class="form-control"
                    id="origin_price"
                    min="0"
                    v-model.number="tempPlace.address"
                    placeholder="請輸入地址"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">描述</label>
                <textarea
                  type="text"
                  class="form-control"
                  id="description"
                  v-model="tempPlace.description"
                  placeholder="請輸入產品描述"
                ></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="tempPlace.is_enabled"
                    :true-value="1"
                    :false-value="0"
                    id="is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-place', tempPlace)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import modalMixin from '@/mixins/modalMixin';
import Modal from 'bootstrap/js/dist/modal';

export default {
  props: {
    place: {
      type: Object,
      default() { return {}; },
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      status: {},
      modal: '',
      tempPlace: {},
    };
  },
  emits: ['update-place'],
  watch: {
    place: {
      handler(val) {
        this.tempPlace = { ...val };
      },
      deep: true,
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
