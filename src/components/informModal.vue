<template>
  <div>
    <!-- Modal -->
    <div class="modal fade" ref="modal" id="exampleModal" tabindex="-1" aria-labelledby="informModal"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="informModal">{{ title }}</h1>
            <button type="button" class="btn-close" aria-label="Close" @click="hideModal"></button>
          </div>
          <div class="modal-body">
            {{ message }}
          </div>
          <div class="modal-footer">
            <button v-if="usedBtn('cancel')" type="button" class="btn btn-secondary" @click="hideModal">取消</button>
            <button v-if="usedBtn('confirm')" type="button" class="btn btn-primary"
              @click.prevent="btnEmitEvent('confirm')">確定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal';

export default {
  // props: {
  //   title: {
  //     type: String,
  //     default: '提示視窗',
  //   },
  //   message: {
  //     type: String,
  //     default: '',
  //   },
  //   footerBtnArray: {
  //     type: Array,
  //     default: () => ['confirm'],
  //   },
  // },
  data() {
    return {
      modal: null,
      title: '',
      message: '',
      footerBtnArray: ['confirm'],
    };
  },
  methods: {
    openModal(message, title = '提示視窗', footerBtnArray = ['confirm']) {
      this.message = message;
      this.title = title;
      this.footerBtnArray = footerBtnArray;
      this.modal.show();
    },
    hideModal() {
      this.message = '';
      this.title = '';
      this.footerBtnArray = ['confirm'];
      this.modal.hide();
      // this.$emit('cancel');
    },
    usedBtn(btn) {
      return this.footerBtnArray.includes(btn);
    },
    btnEmitEvent(emitName) {
      this.$emit(emitName);
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};

</script>
