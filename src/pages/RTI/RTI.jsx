import { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";

function RTI() {
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const breadcrumbs = [{ label: "RTI", href: null }];

  const rtiOfficers = [
    {
      name: "श्री. प्रकाश लालासाहेब पोळ",
      designation: "जन माहिती अधिकारी (PIO)",
      department: "गट विकास कार्यालय",
      email: "pio.shirala@maharashtra.gov.in",
      phone: "+91-2345-272128",
    },
    {
      name: "श्री. अजिंक्य महादेव कुंभार",
      designation: "सहाय्यक जन माहिती अधिकारी (APIO)",
      department: "गट विकास कार्यालय",
      email: "apio.shirala@maharashtra.gov.in",
      phone: "+91-2345-272129",
    },
  ];

  const rtiProcess = [
    {
      step: 1,
      title: "अर्ज सादर करा",
      description:
        "जन माहिती अधिकाऱ्यांकडे (PIO) विहित शुल्कासह RTI अर्ज सादर करा.",
    },
    {
      step: 2,
      title: "पोहोच पावती",
      description: "अर्ज क्रमांकासह अर्जाची पोहोच पावती मिळवा.",
    },
    {
      step: 3,
      title: "प्रक्रिया",
      description: "अर्जावर ३० दिवसांच्या आत प्रक्रिया केली जाते.",
    },
    {
      step: 4,
      title: "प्रतिसाद",
      description:
        "माहिती प्राप्त करा किंवा अर्ज नाकारला असल्यास कारणे जाणून घ्या.",
    },
  ];

  return (
    <div>
      <PageHeader
        title="माहितीचा अधिकार (RTI)"
        subtitle="लोकसेवा हक्क अधिनियम २०१५"
        breadcrumbs={breadcrumbs}
      />

      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* About RTI */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  माहिती अधिकार कायद्याबद्दल
                </h2>
                <div className="prose">
                  <p>
                    माहितीचा अधिकार अधिनियम, २००५ नागरिकांना सार्वजनिक
                    प्राधिकरणांकडून माहिती मिळवण्याचे अधिकार देतो. प्रत्येक
                    नागरिकाला सार्वजनिक कार्यालयांकडून माहिती मागण्याचा आणि ३०
                    दिवसांच्या आत उत्तर मिळवण्याचा अधिकार आहे.
                  </p>
                  <p>
                    RTI कायदा प्रत्येक सार्वजनिक प्राधिकरणाच्या कामात पारदर्शकता
                    आणि जबाबदारीला प्रोत्साहन देतो. हे भ्रष्टाचाराशी लढण्याचे
                    आणि सुशासन आणण्याचे एक प्रभावी साधन आहे.
                  </p>
                </div>
              </div>
            </Card>

            {/* Application Process */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">अर्ज प्रक्रिया</h2>
                <div className="space-y-4">
                  {rtiProcess.map((process) => (
                    <div key={process.step} className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {process.step}
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{process.title}</h4>
                        <p className="text-gray-600 text-sm">
                          {process.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Fee Structure */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">शुल्क रचना</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2">सेवा</th>
                        <th className="text-right py-2">शुल्क</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      <tr>
                        <td className="py-2">RTI अर्ज</td>
                        <td className="text-right py-2">₹१०</td>
                      </tr>
                      <tr>
                        <td className="py-2">अतिरिक्त पृष्ठे (प्रति पृष्ठ)</td>
                        <td className="text-right py-2">₹२</td>
                      </tr>
                      <tr>
                        <td className="py-2">
                          कागदपत्रांची तपासणी (प्रति तास)
                        </td>
                        <td className="text-right py-2">₹५</td>
                      </tr>
                      <tr>
                        <td className="py-2">CD/DVD प्रत</td>
                        <td className="text-right py-2">₹५०</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            {/* Guidelines */}
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  महत्वाच्या मार्गदर्शक सूचना
                </h2>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li>अर्ज स्पष्ट आणि माहितीबद्दल विशिष्ट असावा.</li>
                  <li>पत्रव्यवहारासाठी पूर्ण टपाल पत्ता द्यावा.</li>
                  <li>अर्जासोबत शुल्क भरल्याचा पुरावा जोडावा.</li>
                  <li>
                    माहिती ३० दिवसांत दिली जाईल (जीवन आणि स्वातंत्र्याच्या
                    बाबींसाठी ४८ तास).
                  </li>
                  <li>
                    प्रतिसादावर समाधानी नसल्यास, ३० दिवसांच्या आत प्रथम अपील
                    दाखल करू शकता.
                  </li>
                  <li>
                    BPL (दारिद्र्य रेषेखालील) अर्जदारांना शुल्क भरण्यापासून सूट
                    आहे.
                  </li>
                </ul>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">जलद कृती</h3>
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    onClick={() => setShowApplicationModal(true)}
                  >
                    RTI साठी अर्ज करा
                  </Button>
                  <Button variant="outline" className="w-full">
                    अर्ज डाउनलोड करा
                  </Button>
                  <Button variant="outline" className="w-full">
                    अर्जाची स्थिती तपासा
                  </Button>
                  <Button variant="outline" className="w-full">
                    अपील दाखल करा
                  </Button>
                </div>
              </div>
            </Card>

            {/* RTI Officers */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">RTI अधिकारी</h3>
                <div className="space-y-4">
                  {rtiOfficers.map((officer, index) => (
                    <div
                      key={index}
                      className="border-b last:border-b-0 pb-3 last:pb-0"
                    >
                      <div className="font-medium text-sm">{officer.name}</div>
                      <div className="text-xs text-gray-600 mb-1">
                        {officer.designation}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        {officer.department}
                      </div>
                      <div className="flex flex-col gap-1">
                        <a
                          href={`mailto:${officer.email}`}
                          className="text-xs text-primary hover:underline"
                        >
                          {officer.email}
                        </a>
                        <a
                          href={`tel:${officer.phone}`}
                          className="text-xs text-primary hover:underline"
                        >
                          {officer.phone}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Helpful Links */}
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">उपयुक्त संसाधने</h3>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="block text-sm text-primary hover:underline"
                  >
                    RTI कायदा PDF
                  </a>
                  <a
                    href="#"
                    className="block text-sm text-primary hover:underline"
                  >
                    अर्जाचा नमुना
                  </a>
                  <a
                    href="#"
                    className="block text-sm text-primary hover:underline"
                  >
                    अपील नमुना
                  </a>
                  <a
                    href="#"
                    className="block text-sm text-primary hover:underline"
                  >
                    शुल्क भरणा मार्गदर्शक
                  </a>
                  <a
                    href="https://rtionline.maharashtra.gov.in"
                    className="block text-sm text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    महाराष्ट्र RTI पोर्टल
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        title="RTI अर्ज फॉर्म"
        size="lg"
      >
        <form className="space-y-4">
          <Input
            label="पूर्ण नाव"
            placeholder="तुमचे पूर्ण नाव प्रविष्ट करा"
            required
          />
          <Input label="पत्ता" placeholder="पूर्ण टपाल पत्ता" required />
          <Input
            label="फोन नंबर"
            type="tel"
            placeholder="तुमचा संपर्क क्रमांक"
          />
          <Input label="ईमेल" type="email" placeholder="तुमचा ईमेल पत्ता" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              आवश्यक माहिती *
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              rows="4"
              placeholder="तुम्ही शोधत असलेल्या माहितीचे स्पष्ट वर्णन करा..."
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              अर्ज सादर करा
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowApplicationModal(false)}
              className="flex-1"
            >
              रद्द करा
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default RTI;
