import styled from 'styled-components'

const StyledBanner = styled.div`
  width: 100%;
  /* The resulting background color will be based on the bg props. */
  background-image: url("${props => props.img}");
  background-size: cover;
  background-position: center;
  height: 300px;
`

export default function Banner({ img }) {
  return (
      <StyledBanner img={img}>

      </StyledBanner>
  )
}