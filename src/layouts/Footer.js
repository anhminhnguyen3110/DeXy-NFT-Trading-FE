/**
 * Author: Kien Quoc Mai, Duy Khoa Pham
 * Created date: 18/08/2023
 * Last modified Date: 29/08/2023
 */
import { Container, Box, Typography, Link, Grid, styled, Avatar, Stack } from '@mui/material'

const FooterStyle = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral,
  color: theme.palette.text.primary,
  paddingBlock: '2rem',
}))

const DeXyHeadingStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: 'Teko',
  fontSize: '2.75rem',
  fontWeight: 600,
  marginBottom: '0.5rem',
}))

const members = [
  {
    name: 'Anh Minh Nguyen',
    email: '103178955@student.swin.edu.au',
  },
  {
    name: 'Duy Khoa Pham',
    email: '103515617@student.swin.edu.au',
  },
  {
    name: 'Kien Quoc Mai',
    email: '103532920@student.swin.edu.au',
  },
]

/**
 * Sitewide footer
 * @returns {JSX.Element}
 */
function Footer() {
  return (
    <FooterStyle>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={5}
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Grid item xs={12} md={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '45rem' }}>
              <DeXyHeadingStyle>DeXy</DeXyHeadingStyle>
              <Typography variant="body1">
                DeXy is a decentralized trading platform for the Web3 enthusiast. It lets you trade
                in any crypto asset with transparency. Whether you are a newbie or a Web3 guru, DeXy
                gives you the familiar look and feel of a traditional trading platform. DeXy is more
                than just a platform, it’s a party of awesome traders who share their enthusiasm.
                Join DeXy today and experience the thrill of decentralized trading.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            {/* 20% width on medium and up screens */}
            <Typography variant="h6" gutterBottom>
              The team
            </Typography>
            {members.map((member, index) => (
              <Stack direction={'row'} alignItems={'center'} mt={2} key={`member-avatar-${index}`}>
                {/* TODO: Pass avatar */}
                <Avatar sx={{ marginRight: 2 }} />
                <Stack gap={0.2}>
                  <Typography variant="body1">{member.name}</Typography>
                  <Link href={`mailto:${member.email}`} color="inherit" underline="hover">
                    <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
                      {member.email}
                    </Typography>
                  </Link>
                </Stack>
              </Stack>
            ))}
          </Grid>
          <Grid item xs={12} md={12} sx={{ mt: 'auto', mb: 1 }}>
            <Typography variant="body1`">© 2023 All Rights Reserved DeXy</Typography>
          </Grid>
        </Grid>
      </Container>
    </FooterStyle>
  )
}

export default Footer
