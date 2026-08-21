<script setup lang="ts">
import { Search } from '@lucide/vue'

const name = ref('王小明')
const email = ref('')
const password = ref('demo-password')
const readonlyValue = ref('系統自動帶入')
const note = ref('')
const location = ref('taipei')
const warningLocation = ref('')
const manualContact = ref('email')
const contactMethod = ref('email')
const symbolRadio = ref('enabled')
const lookupCode = ref('')
const selectedDate = ref('2026-08-12')
const selectedTime = ref('14:00')
const participantCount = ref(2)
const intensity = ref(40)
const agreed = ref(true)
const newsletter = ref(false)
const symbolCheckbox = ref(true)

const locationOptions = [
  { label: '台北門市', value: 'taipei' },
  { label: '台中門市', value: 'taichung' },
  { label: '高雄門市（暫停服務）', value: 'kaohsiung', disabled: true },
]

const contactOptions = [
  { label: 'Email', value: 'email' },
  { label: '電話', value: 'phone' },
  { label: '簡訊', value: 'sms' },
]
</script>

<template>
  <ShowcasePage
    title="表單"
    description="輸入與勾選元件的常用狀態，包括必填、選填、唯讀及停用。"
  >
    <ShowcaseSection
      title="表單欄位容器"
      component-name="UIFormGroup"
      description="只負責標題、星號、警告、外框 class 與前後 slots，不綁定特定欄位元件。"
      usage='<UIFormGroup label="欄位標題" star warning-text="錯誤訊息">\n  欄位內容\n</UIFormGroup>'
    >
      <div class="form-grid">
        <UIFormGroup label="一般容器" star>
          <div class="group-demo-control">Default slot 內容</div>
        </UIFormGroup>
        <UIFormGroup label="選填容器">
          <template #slot-label>
            <small class="form-group__optional">（選填）</small>
          </template>
          <div class="group-demo-control">可使用 slot-label</div>
        </UIFormGroup>
        <UIFormGroup label="警告容器" star warning-text="此欄位內容有誤">
          <div class="group-demo-control">warning 與 warningText</div>
        </UIFormGroup>
      </div>

      <div class="form-grid">
        <UIFormGroup label="自訂標題內容">
          <template #slot-before
            ><p class="slot-example">slot-before</p></template
          >
          <div class="group-demo-control">Default slot 內容</div>
          <template #slot-after
            ><p class="slot-example">slot-after</p></template
          >
        </UIFormGroup>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="輸入框"
      component-name="UIFormInput"
      description="獨立負責 v-model 與原生輸入狀態；以 status 管理 default、error、warning，並可用 size 調整高度。"
      usage='<UIFormInput v-model="name" placeholder="請輸入姓名" status="error" size="md" />'
    >
      <div class="form-grid">
        <UIFormGroup label="Default">
          <UIFormInput v-model="name" placeholder="請輸入姓名" />
        </UIFormGroup>

        <UIFormGroup label="Warning" warning>
          <UIFormInput
            v-model="email"
            placeholder="輸入格式錯誤"
            status="error"
          />
        </UIFormGroup>

        <UIFormGroup label="Readonly">
          <UIFormInput v-model="readonlyValue" readonly />
        </UIFormGroup>

        <UIFormGroup label="Disabled">
          <UIFormInput model-value="不可編輯" disabled />
        </UIFormGroup>

        <UIFormGroup label="Small">
          <UIFormInput model-value="較小尺寸" size="sm" readonly />
        </UIFormGroup>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="密碼欄位"
      component-name="UIFormPassword"
      description="具備顯示／隱藏密碼按鈕，支援 required、disabled、readonly 與 autocomplete。"
      usage='<UIFormGroup label="密碼" star>\n  <UIFormPassword v-model="password" required />\n</UIFormGroup>'
    >
      <div class="form-grid">
        <UIFormGroup label="密碼" star>
          <UIFormPassword
            v-model="password"
            placeholder="請輸入密碼"
            required
          />
        </UIFormGroup>
        <UIFormGroup label="密碼錯誤">
          <UIFormPassword model-value="wrong-password" warning />
        </UIFormGroup>
        <UIFormGroup label="停用密碼欄位">
          <UIFormPassword model-value="password" disabled />
        </UIFormGroup>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="複製文字"
      component-name="UIFormCopy"
      description="顯示唯讀文字並提供複製按鈕，複製成功後圖示會變為勾勾。"
      usage='<UIFormCopy text="可複製的文字" />'
    >
      <div class="form-grid">
        <UIFormGroup label="可複製文字">
          <UIFormCopy text="copy-this-text" />
        </UIFormGroup>
        <UIFormGroup label="停用複製文字">
          <UIFormCopy text="不可複製的文字" disabled />
        </UIFormGroup>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="多行輸入"
      component-name="UIFormTextarea"
      description="支援 rows、maxlength、resize，以及 default、warning、disabled 狀態。"
      usage='<UIFormTextarea v-model="note" :rows="4" warning />'
    >
      <div class="form-grid form-grid--three">
        <div class="field-demo">
          <span>Default</span
          ><UIFormTextarea v-model="note" placeholder="請輸入特殊需求" />
        </div>
        <div class="field-demo">
          <span>Warning</span
          ><UIFormTextarea model-value="內容格式有誤" warning />
        </div>
        <div class="field-demo">
          <span>Disabled</span
          ><UIFormTextarea model-value="不可編輯的內容" disabled />
        </div>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="下拉選單"
      component-name="UIFormSelect"
      description="透過 options 物件陣列建立選項，支援一般、warning、disabled 狀態。"
      usage='<UIFormSelect v-model="location" :options="locationOptions" warning />'
    >
      <div class="form-grid form-grid--three">
        <div class="field-demo">
          <span>Default</span
          ><UIFormSelect v-model="location" :options="locationOptions" />
        </div>
        <div class="field-demo">
          <span>Warning</span
          ><UIFormSelect
            v-model="warningLocation"
            :options="locationOptions"
            warning
          />
        </div>
        <div class="field-demo">
          <span>Disabled</span
          ><UIFormSelect
            model-value="taipei"
            :options="locationOptions"
            disabled
          />
        </div>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="單選選項"
      component-name="UIFormRadio + UIFormRadioGroup"
      description="可手動組合單一 Radio，或用 options 產生 RadioGroup；純符號模式必須提供 aria-label。"
      usage='<UIFormRadio v-model="method" name="contact" value="email" label="Email" />\n<UIFormRadio v-model="enabled" name="enabled" value="yes" aria-label="啟用" />\n<UIFormRadioGroup v-model="method" :options="contactOptions" />'
    >
      <div class="option-demo-grid">
        <UIFormGroup label="手動組合">
          <div class="radio-list">
            <UIFormRadio
              v-model="manualContact"
              name="notification-method"
              value="email"
              label="Email"
            />
            <UIFormRadio
              v-model="manualContact"
              name="notification-method"
              value="phone"
              label="電話"
            />
            <UIFormRadio
              v-model="manualContact"
              name="notification-method"
              value="sms"
              warning
              >簡訊</UIFormRadio
            >
          </div>
        </UIFormGroup>
        <UIFormGroup label="Options 群組">
          <UIFormRadioGroup v-model="contactMethod" :options="contactOptions" />
        </UIFormGroup>
        <UIFormGroup label="純 Radio 符號">
          <UIFormRadio
            v-model="symbolRadio"
            name="symbol-radio"
            value="enabled"
            aria-label="啟用功能"
          />
        </UIFormGroup>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="多選選項"
      component-name="UIFormCheckbox"
      description="可獨立組合多個核取項目；不需要文字時省略 label／slot，並提供 aria-label。"
      usage='<UIFormCheckbox v-model="agreed" label="我同意服務條款" />\n<UIFormCheckbox v-model="enabled" aria-label="啟用通知" />'
    >
      <div class="check-list">
        <UIFormCheckbox v-model="agreed" label="我同意服務條款" />
        <UIFormCheckbox v-model="newsletter" warning
          >接收通知與最新消息</UIFormCheckbox
        >
        <UIFormCheckbox label="此選項目前不可使用" disabled />
        <div class="symbol-example">
          <span>純 Checkbox 符號</span>
          <UIFormCheckbox v-model="symbolCheckbox" aria-label="啟用通知" />
        </div>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="輸入框旁按鈕"
      component-name="UIFormButton"
      description="固定為 44px 高，展示 primary、secondary、outline、warning 與 disabled 狀態。"
      usage='<UIFormButton variant="outline">外框按鈕</UIFormButton>\n<UIFormButton warning>警告操作</UIFormButton>'
    >
      <div class="button-state-grid">
        <div class="field-demo">
          <span>Primary</span><UIFormButton>主要按鈕</UIFormButton>
        </div>
        <div class="field-demo">
          <span>Secondary</span
          ><UIFormButton variant="secondary">次要按鈕</UIFormButton>
        </div>
        <div class="field-demo">
          <span>Outline</span
          ><UIFormButton variant="outline">外框按鈕</UIFormButton>
        </div>
        <div class="field-demo">
          <span>Warning</span><UIFormButton warning>警告操作</UIFormButton>
        </div>
        <div class="field-demo">
          <span>Disabled</span><UIFormButton disabled>停用按鈕</UIFormButton>
        </div>
      </div>
      <div class="form-grid">
        <UIFormGroup label="查詢代碼">
          <div class="inline-field">
            <UIFormInput v-model="lookupCode" placeholder="輸入查詢代碼" />
            <UIFormButton
              ><Search :size="17" aria-hidden="true" />查詢</UIFormButton
            >
          </div>
        </UIFormGroup>
      </div>
    </ShowcaseSection>

    <ShowcaseSection
      title="日期、時間、數值與拉桿"
      component-name="UIFormDate + UIFormTime + UIFormNumber + UIFormRange"
      description="分別封裝原生 date、time、number 與 range，保留瀏覽器輸入能力並統一樣式。"
      usage='<UIFormDate v-model="date" min="2026-08-01" />\n<UIFormRange v-model="value" :min="0" :max="100" value-suffix="%" />'
    >
      <div class="form-grid">
        <UIFormGroup label="日期" star>
          <UIFormDate
            v-model="selectedDate"
            min="2026-08-01"
            max="2026-12-31"
            required
          />
        </UIFormGroup>
        <UIFormGroup label="時間" star>
          <UIFormTime
            v-model="selectedTime"
            min="09:00"
            max="20:00"
            :step="1800"
            required
            warning
          />
        </UIFormGroup>
        <UIFormGroup label="參與人數">
          <UIFormNumber v-model="participantCount" :min="1" :max="10" />
        </UIFormGroup>
        <UIFormGroup label="造型調整幅度">
          <UIFormRange
            v-model="intensity"
            :min="0"
            :max="100"
            :step="5"
            value-suffix="%"
            warning
          />
        </UIFormGroup>
      </div>
    </ShowcaseSection>
  </ShowcasePage>
</template>
