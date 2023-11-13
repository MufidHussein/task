import React, { type FC, type FormEvent } from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'

interface AddFormBaseProps<T> {
  onSubmit: (values: T) => void
  title: string
  children: React.ReactNode
}

const AddFormBase: FC<AddFormBaseProps<any>> = ({
  title,
  onSubmit,
  children
}) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formValues: Record<string, any> = {}

    formData.forEach((value, key) => {
      formValues[key] = value
    })

    onSubmit(formValues)
  }

  return (
        <form onSubmit={handleSubmit}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                      marginTop: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                >
                    <Typography component="h1" variant="h5">
                        {title}
                    </Typography>
                    {children}
                    <Button type="submit" fullWidth variant="contained" sx={{
                      mt: 3,
                      mb: 2
                    }}>
                        ADD
                    </Button>
                </Box>
            </Container>
        </form>
  )
}

export default AddFormBase