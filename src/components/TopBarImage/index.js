import React from 'react'

const TopBarImage = ({heading="TMS",children}) => {
  return (
     <div style={{
        backgroundImage:"url('/assets/images/bus1.jpg')",
        height:150,
        width:"100%",
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        marginTop:50
      }} >
        <div
          style={{
            width:"100%",
            height:"100%",
            backgroundColor:"rgba(0,0,0,0.8)",
            color:"var(--secondary-color)",
            display:"flex",
            flexDirection:"row",
            alignItems:'center',
            justifyContent:"center",
            gap:10,
            fontSize:"var(--normal-fontsize)"
          }}
        >
          {children?children:heading}
        </div>
      </div>
  )
}

export default TopBarImage