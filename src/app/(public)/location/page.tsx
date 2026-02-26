import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, Mail, Phone } from "lucide-react";

export default function LocationPage() {
    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="text-center space-y-2">
                <h1 className="text-4xl font-bold">Find Us</h1>
                <p className="text-muted-foreground">Visit our clubhouse in Košice</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5" />
                            Address
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            [Street Address]<br />
                            040 01 Košice<br />
                            Slovakia
                        </p>
                        <div className="mt-4 h-64 bg-muted rounded-lg flex items-center justify-center">
                            <p className="text-sm text-muted-foreground">[Map Integration Placeholder]</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Opening Hours
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex justify-between">
                            <span>Monday</span>
                            <span className="text-muted-foreground">Closed</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tuesday–Thursday</span>
                            <span className="text-muted-foreground">17:00 – 23:00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Friday–Saturday</span>
                            <span className="text-muted-foreground">17:00 – 01:00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Sunday</span>
                            <span className="text-muted-foreground">14:00 – 22:00</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mail className="h-5 w-5" />
                            Contact
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <a href="mailto:info@hramelot.sk" className="text-primary hover:underline">
                                info@hramelot.sk
                            </a>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">+421 XXX XXX XXX</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>How to Get Here</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-muted-foreground">
                        <p><strong>By Tram:</strong> Lines X, Y - Stop &quot;Name&quot;</p>
                        <p><strong>By Bus:</strong> Lines XX, YY</p>
                        <p><strong>Parking:</strong> Street parking available nearby</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}