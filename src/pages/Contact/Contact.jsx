import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import { mockData } from "../../data/mockData";

function Contact() {
  const breadcrumbs = [{ label: "संपर्क", href: null }];

  return (
    <div>
      <PageHeader
        title="आमच्याशी संपर्क साधा"
        subtitle="विविध विभाग आणि अधिकाऱ्यांशी संपर्क साधा"
        breadcrumbs={breadcrumbs}
      />

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">विभाग संपर्क</h2>
            <div className="grid gap-6">
              {mockData.contacts.map((contact, index) => (
                <Card key={index}>
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">
                          {contact.department}
                        </h3>
                        <p className="text-gray-600 mb-3">{contact.officer}</p>
                        {contact.designation && (
                          <p className="text-sm text-gray-500 mb-3">
                            {contact.designation}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <a
                        href={`tel:${contact.phone}`}
                        className="inline-flex items-center text-primary hover:text-primary-dark"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        {contact.phone}
                      </a>
                      <a
                        href={`mailto:${contact.email}`}
                        className="inline-flex items-center text-primary hover:text-primary-dark"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  कार्यालयाचा पत्ता
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="font-medium">ग्रामपंचायत ढोलेवाडी</div>
                    <div className="text-gray-600">ता. शिराळा, जि. सांगली</div>
                    <div className="text-gray-600">महाराष्ट्र ४१५ ४०८</div>
                  </div>

                  <div>
                    <div className="font-medium">मुख्य फोन</div>
                    <div className="text-gray-600">८८३०४९६४२०</div>
                    <div className="text-gray-600">९३७३३५६९३१</div>
                  </div>

                  <div>
                    <div className="font-medium">ईमेल</div>
                    <div className="text-gray-600">gpdholewadi415408@gmail.com</div>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">कार्यालयीन वेळ</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>सोमवार - शुक्रवार</span>
                    <span>सकाळी १०:०० ते सायं ५:००</span>
                  </div>
        
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">आणीबाणी संपर्क</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>पोलीस</span>
                    <span>१००</span>
                  </div>
                  <div className="flex justify-between">
                    <span>अग्निशमन दल</span>
                    <span>१०१</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ॲम्ब्युलन्स</span>
                    <span>१०८</span>
                  </div>
                  <div className="flex justify-between">
                    <span>आपत्ती हेल्पलाइन</span>
                    <span>१०७७</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
