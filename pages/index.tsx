import type {NextPage} from 'next'
import Head from 'next/head'
import Header from "../components/Header";

const Home: NextPage = () => {
    return (
        <div className="">
            <Head>
                <title>Social - 02</title>
            </Head>

            <Header />
        </div>
    )
}

export default Home
