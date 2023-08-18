import { Container, Box, Typography, Link, Grid, styled, Avatar, Stack } from '@mui/material'

const FooterStyle = styled('footer')(({ theme }) => ({
  backgroundColor: '#012030',
  color: '#FEFEFE',
  padding: theme.spacing(4, 0),
}))

const DeXyLayoutStyle = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexShrink: 0,
})

const DeXyHeadingStyle = styled(Typography)(({ theme }) => ({
  color: 'var(--green-1, #DAFDBA)',
  fontFamily: 'Teko',
  fontSize: '44px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: 'normal',
  letterSpacing: '4.4px',
}))

const DeXyDescriptionLayoutStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flexShrink: 0,
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
          <Grid item xs={12} md={9}>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '45rem' }}>
              <DeXyLayoutStyle>
                <DeXyHeadingStyle>DeXy</DeXyHeadingStyle>
              </DeXyLayoutStyle>

              <DeXyDescriptionLayoutStyle>
                <Typography variant="body1">
                  DeXy is the sexiest decentralized trading platform for the crypto lovers. It lets
                  you swap, trade, and invest in any crypto asset with style and fun. Whether you
                  are a newbie or a veteran, DeXy gives you the features and tips you need to rock
                  the crypto market. DeXy is more than just a platform, it’s a party of awesome
                  traders who share their wisdom, tactics, and enthusiasm. Join DeXy today and
                  experience the thrill of crypto trading.
                </Typography>
              </DeXyDescriptionLayoutStyle>
            </Box>
          </Grid>
          <Grid item xs={12} md={2}>
            {' '}
            {/* 20% width on medium and up screens */}
            <Typography variant="h6" gutterBottom>
              The team
            </Typography>
            {members.map((member, index) => (
              <Stack direction={'row'} alignItems={'center'} mt={2} key={`member_avatar_${index}`}>
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
