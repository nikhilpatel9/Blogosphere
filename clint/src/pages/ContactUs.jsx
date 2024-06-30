/* eslint-disable react/no-unescaped-entities */
import { Alert, Button, Label, Spinner, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value.trim()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill out all fields.');
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* Left side */}
        <div className="flex-1">
          <Link to="/" className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>BlogoSphere</span>
          </Link>
          <p className="text-sm mt-5">
            Have a question or feedback? We'd love to hear from you. Fill out the form and we'll get back to you as soon as possible.
          </p>
        </div>
        {/* Right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value='Your Name' />
              <TextInput
                type="text"
                placeholder="John Doe"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your Email' />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your Message' />
              <Textarea
                id="message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleChange}
                rows={4}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
            >
              {
                loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Sending...</span>
                  </>
                ) : (
                  'Send Message'
                )
              }
            </Button>
          </form>
          {
            error && (
              <Alert className="mt-5" color='failure'>
                {error}
              </Alert>
            )
          }
          {
            success && (
              <Alert className="mt-5" color='success'>
                Message sent successfully!
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}