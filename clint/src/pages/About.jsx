/* eslint-disable react/no-unescaped-entities */

export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto p-6 text-center bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8">About BlogoSphere</h1>
        <div className="space-y-12">
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEwfHxibG9nZ2luZ3xlbnwwfHx8fDE2ODg3MTI3OTQ&ixlib=rb-1.2.1&q=80&w=400"
              alt="Blogging"
              className="w-full max-w-md h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-lg text-gray-700 dark:text-gray-300">
              BlogoSphere is a blogging platform that allows users to create, share, and discover content
              on a wide range of topics. Our mission is to provide a platform where users can express
              themselves freely, share their ideas, and connect with like-minded individuals.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHRlY2huaWNhbCUyMHRhbGslMjBjb21wdXRlcnxlbnwwfHx8fDE2ODg3MTI4MzU&ixlib=rb-1.2.1&q=80&w=400"
              alt="Sharing Ideas"
              className="w-full max-w-md h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-lg text-gray-700 dark:text-gray-300">
              At BlogoSphere, we believe that everyone has a story to tell, and we
              want to empower users to share their stories with the world. Whether you're a seasoned
              blogger or just starting out, our platform provides the tools and resources you need to
              create high-quality content and build a loyal following.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGJsb2dnaW5nfGVufDB8fHx8MTY4ODcxMjc5NA&ixlib=rb-1.2.1&q=80&w=400"
              alt="Inclusive Environment"
              className="w-full max-w-md h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our project is dedicated to providing a safe, inclusive, and respectful environment for all users.
              We believe that everyone deserves to have their voice heard, and we're committed to
              creating a platform that is free from harassment, bullying, and hate speech.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
