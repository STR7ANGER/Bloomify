import React from 'react'

const Contact = () => {
  return (
    <div className='pt-[6rem] bg-products bg-center bg-cover'>
      <div className="bg-black/70 text-white flex flex-col py-[3.3rem] px-20 items-center">
      <div className="w-full p-8 rounded-3xl bg-white/5 border-gray-500 border">
        <h2 className="text-4xl font-semibold leading-10">Contact Us - <span className="text-gray-300">BLOOMIFY</span></h2>
        <p className="mt-2 text-gray-300 leading-10">
          We'd love to hear from you! Whether you have a question, need support, or want to collaborate, feel free to reach out.
        </p>
        
        <div className="mt-6">
          <h3 className="text-4xl font-semibold leading-10">Our Office</h3>
          <p className="text-gray-300 leading-10">Bloomify HQ</p>
          <p className="text-gray-300 leading-10">123 Floral Avenue, Green City, Country</p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-4xl font-semibold leading-10">Call Us</h3>
          <p className="text-gray-300 leading-10">Customer Support: +1 234 587 890</p>
          <p className="text-gray-300 leading-10">Business Inquiries: +1 987 654 321</p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-4xl font-semibold leading-10">Email Us</h3>
          <p className="text-gray-300 leading-10">Support: <a href="mailto:support@bloomify.com" className="underline">support@bloomify.com</a></p>
          <p className="text-gray-300 leading-10">Partnerships: <a href="mailto:partners@bloomify.com" className="underline">partners@bloomify.com</a></p>
        </div>
        
        <div className="mt-4">
          <h3 className="text-4xl font-semibold leading-10">Working Hours</h3>
          <p className="text-gray-300 leading-10">Monday - Friday: 9 AM - 6 PM</p>
          <p className="text-gray-300 leading-10">Saturday: 10 AM - 4 PM</p>
          <p className="text-gray-300 leading-10">Sunday: Closed</p>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Contact
