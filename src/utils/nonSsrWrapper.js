/**
 * Author: Kien Quoc Mai
 * Created date: 12/09/2023
 * Last modified Date: 12/09/2023
 */
import React from 'react'
import dynamic from 'next/dynamic'

// Use this component to wrap components that should not be rendered on the server
// Wrap pages or components that is integrated with web3 using this component
// to avoid hydration error
const NonSSRWrapper = (props) => <React.Fragment>{props.children}</React.Fragment>
export default dynamic(() => Promise.resolve(NonSSRWrapper), {
  ssr: false,
})
