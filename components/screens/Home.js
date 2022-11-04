import React from "react"

import { Button, Image, VStack, Text, Box, HStack, Center } from "native-base"
import { ImageBackground, SafeAreaView } from "react-native"

export default function Home({ navigation }) {


    return (
        <SafeAreaView>

            <ImageBackground
                source={{
                    uri: "https://i.imgur.com/sGHo6Gd.png",
                }}
                style={{ width: '100%', height: '100%' }}
            >
                <Center flex={1} px="3" my={2}>

                    <Box style={{
                        position: 'absolute',
                        bottom: 0,
                    }}>
                        <Button size="lg" onPress={() => navigation.navigate('UserRegistration')}>Register Now</Button>
                        <Text bold>Already have an account?</Text>
                        <Button size="lg" variant="link" colorScheme="secondary" onPress={() => navigation.navigate('Login')}>Login</Button>
                    </Box>
                </Center>
            </ImageBackground>

        </SafeAreaView>
    )
}