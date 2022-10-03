import type {NextPage} from 'next'
import Head from 'next/head'
import PostBox from "../components/PostBox";

const Home: NextPage = () => {
    return (
        <div className="">
            <Head>
                <title>Social - 02</title>
                <link rel="icon" href="reddit.png"/>
            </Head>

            <PostBox />

            <div>

            </div>
        </div>
    )
}

export default Home
