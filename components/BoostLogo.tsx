import mangoStore from '@store/mangoStore'

const BoostLogo = ({ className }: { className?: string }) => {
  const submittingBoost = mangoStore((s) => s.submittingBoost)
  return (
    <svg
      className={`${className} ${submittingBoost ? 'animate-shake' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 37"
      fill="currentColor"
    >
      <path
        d="M29.3877 2C38.5623 2 45.9999 9.3873 45.9999 18.5C45.9999 27.6127 38.5623 35 29.3877 35C20.213 35 2 18.5 2 18.5C2 18.5 20.213 2 29.3877 2Z"
        fill="#ECEE8F"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.657208 17.0178L2 18.5L0.657208 19.9822C0.238716 19.6031 -7.83977e-07 19.0647 -8.0866e-07 18.5C-8.33344e-07 17.9353 0.238716 17.3969 0.657208 17.0178ZM3.51459 17.1718C2.55291 17.9991 2 18.5 2 18.5C0.657208 17.0178 0.656887 17.0181 0.657208 17.0178L0.673388 17.0032L0.715711 16.9651C0.752501 16.932 0.80631 16.8838 0.876304 16.8214C1.01628 16.6967 1.22105 16.5154 1.48394 16.2855C2.00961 15.8258 2.76829 15.1715 3.70656 14.3873C5.581 12.8207 8.18222 10.7274 11.0808 8.62976C13.9722 6.53737 17.1991 4.41164 20.3206 2.80081C23.3793 1.22247 26.5943 2.65222e-06 29.3877 2.53012e-06C39.6541 2.08136e-06 47.9999 8.26998 47.9999 18.5C47.9999 28.73 39.6541 37 29.3877 37C26.5943 37 23.3793 35.7775 20.3206 34.1992C17.1991 32.5884 13.9722 30.4626 11.0808 28.3702C8.18222 26.2726 5.581 24.1793 3.70656 22.6127C2.76829 21.8285 2.00961 21.1742 1.48394 20.7145C1.22105 20.4846 1.01628 20.3033 0.876305 20.1786C0.80631 20.1162 0.752501 20.068 0.715711 20.0349L0.673388 19.9968L0.657208 19.9822C0.656888 19.9819 0.657208 19.9822 2 18.5C2 18.5 2.55291 19.0009 3.51459 19.8282C8.07232 23.7489 21.8116 35 29.3877 35C38.5623 35 45.9999 27.6127 45.9999 18.5C45.9999 9.3873 38.5623 2 29.3877 2C21.8116 2 8.07232 13.2511 3.51459 17.1718Z"
        fill="black"
      />
      <path
        d="M34.81 7.35116C40.9888 7.35116 45.9978 12.3426 45.9978 18.4998C45.9978 24.657 40.9888 29.6484 34.81 29.6484C28.6311 29.6484 16.3652 18.4998 16.3652 18.4998C16.3652 18.4998 28.6311 7.35116 34.81 7.35116Z"
        fill="#E6B699"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.02 17.0198L16.3652 18.4998L15.02 19.9798C14.603 19.6008 14.3652 19.0634 14.3652 18.4998C14.3652 17.9362 14.603 17.3988 15.02 17.0198ZM17.8838 17.1753C16.9322 17.9844 16.3652 18.4998 16.3652 18.4998C15.02 17.0198 15.0198 17.02 15.02 17.0198L15.0319 17.009L15.0614 16.9824C15.0868 16.9595 15.1237 16.9263 15.1716 16.8835C15.2673 16.798 15.4067 16.6741 15.5853 16.5173C15.9425 16.204 16.4572 15.7587 17.0933 15.2253C18.3633 14.1603 20.1275 12.7359 22.0955 11.3071C24.0562 9.88351 26.2589 8.42645 28.4018 7.31704C30.4814 6.24037 32.7639 5.35116 34.81 5.35116C42.0868 5.35116 47.9978 11.2314 47.9978 18.4998C47.9978 25.7682 42.0868 31.6484 34.81 31.6484C32.7639 31.6484 30.4814 30.7592 28.4018 29.6826C26.2589 28.5731 24.0562 27.1161 22.0955 25.6925C20.1275 24.2637 18.3633 22.8393 17.0933 21.7743C16.4572 21.2409 15.9425 20.7956 15.5853 20.4822C15.4067 20.3255 15.2673 20.2016 15.1716 20.1161C15.1237 20.0733 15.0868 20.0401 15.0614 20.0172L15.0319 19.9906L15.0213 19.981L15.02 19.9798C15.0198 19.9796 15.02 19.9798 16.3652 18.4998C16.3652 18.4998 16.9322 19.0151 17.8838 19.8242C21.3582 22.7784 29.9596 29.6484 34.81 29.6484C40.9888 29.6484 45.9978 24.657 45.9978 18.4998C45.9978 12.3426 40.9888 7.35116 34.81 7.35116C29.9596 7.35116 21.3582 14.2212 17.8838 17.1753Z"
        fill="black"
      />
      <path
        d="M40.2343 12.7023C43.4173 12.7023 45.9977 15.2978 45.9977 18.4996C45.9977 21.7013 43.4173 24.2969 40.2343 24.2969C37.0512 24.2969 30.7324 18.4996 30.7324 18.4996C30.7324 18.4996 37.0512 12.7023 40.2343 12.7023Z"
        fill="#E29997"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.3803 17.0259L30.7324 18.4996L29.3803 19.9733C28.9675 19.5945 28.7324 19.0599 28.7324 18.4996C28.7324 17.9393 28.9675 17.4047 29.3803 17.0259ZM32.2601 17.1839C31.3343 17.9474 30.7324 18.4996 30.7324 18.4996C29.3803 17.0259 29.3801 17.0261 29.3803 17.0259L29.3879 17.019L29.4045 17.0038L29.4643 16.9496C29.5157 16.9032 29.5898 16.8368 29.6842 16.7532C29.8729 16.5861 30.1435 16.3498 30.4774 16.0672C31.143 15.5038 32.0702 14.748 33.1075 13.9878C34.1374 13.2329 35.316 12.4441 36.4804 11.8356C37.5808 11.2605 38.9326 10.7023 40.2343 10.7023C44.5329 10.7023 47.9977 14.2043 47.9977 18.4996C47.9977 22.7948 44.5329 26.2969 40.2343 26.2969C38.9326 26.2969 37.5808 25.7386 36.4804 25.1636C35.316 24.5551 34.1374 23.7662 33.1075 23.0114C32.0702 22.2512 31.143 21.4954 30.4774 20.932C30.1435 20.6494 29.8729 20.413 29.6842 20.2459C29.5898 20.1623 29.5157 20.0959 29.4643 20.0496L29.4045 19.9954L29.3879 19.9802L29.3803 19.9733C29.3801 19.9731 29.3803 19.9733 30.7324 18.4996C30.7324 18.4996 31.3343 19.0518 32.2601 19.8153C34.334 21.5258 38.0336 24.2969 40.2343 24.2969C43.4173 24.2969 45.9977 21.7013 45.9977 18.4996C45.9977 15.2978 43.4173 12.7023 40.2343 12.7023C38.0336 12.7023 34.334 15.4734 32.2601 17.1839Z"
        fill="black"
      />
    </svg>
  )
}

export default BoostLogo
