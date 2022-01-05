import Head from 'next/head';
import Image from 'next/image';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}

export default function Home({ allPostsData }) {
	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<section className={utilStyles.headingMd}>
				<p>
					Hi, I'm <b>James</b> a web designer and developer from the UK.
				</p>
				<p>
					On this blog you can find posts from various thoughts on introspection and
					topics surrounding life, collapse, economy and other interests. This is just a
					place for me to share what's on my mind as I learn new frameworks and
					development practices. <hr />
					<Image
						src='http://geniemonkey.co.uk/img/jm.png'
						src='/images/jm.jpg'
						width={64}
						height={58}
						// className={`${utilStyles.mxAuto} ${utilStyles.mt1}`}
					/>
				</p>
			</section>

			<section className={`${utilStyles.headdingMd} ${utilStyles.padding1px}`}>
				<h2 className={utilStyles.headingLg}>Blog</h2>
				<ul className={utilStyles.list}>
					{allPostsData.map(({ id, date, title }) => (
						<li className={utilStyles.listItem} key={id}>
							{title}
							<br />
							{id}
							<br />
							{date}
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
}
