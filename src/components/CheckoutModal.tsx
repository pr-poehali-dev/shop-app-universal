import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { CartItem } from './CartSheet';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onSuccess: () => void;
}

const CheckoutModal = ({ open, onClose, items, total, onSuccess }: CheckoutModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
    paymentMethod: 'card',
    deliveryMethod: 'courier',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setStep(3);
    setTimeout(() => {
      onSuccess();
      setStep(1);
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        comment: '',
        paymentMethod: 'card',
        deliveryMethod: 'courier',
      });
    }, 2000);
  };

  const isStep1Valid = formData.name && formData.phone && formData.email;
  const isStep2Valid = formData.address;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Оформление заказа</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg">Контактные данные</h3>
                <p className="text-sm text-muted-foreground">
                  Укажите ваши данные для связи
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя и фамилия *</Label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (900) 123-45-67"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="rounded-xl"
                />
              </div>
            </div>

            <Separator />

            <div className="bg-muted/50 rounded-xl p-4 space-y-2">
              <h4 className="font-semibold">Ваш заказ:</h4>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    {(item.discount > 0
                      ? Math.round(item.price * (1 - item.discount / 100))
                      : item.price) * item.quantity}₽
                  </span>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Итого:</span>
                <span className="text-primary">{total}₽</span>
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => setStep(2)}
              disabled={!isStep1Valid}
              className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              Далее
              <Icon name="ArrowRight" className="ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg">Доставка и оплата</h3>
                <p className="text-sm text-muted-foreground">
                  Выберите способ доставки и оплаты
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Способ доставки</Label>
                <RadioGroup
                  value={formData.deliveryMethod}
                  onValueChange={(value) => handleInputChange('deliveryMethod', value)}
                >
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:border-primary cursor-pointer transition-colors">
                    <RadioGroupItem value="courier" id="courier" />
                    <Label htmlFor="courier" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Icon name="Truck" className="text-primary" />
                        <div>
                          <p className="font-medium">Курьером</p>
                          <p className="text-sm text-muted-foreground">
                            Доставка 1-3 дня, от 300₽
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:border-primary cursor-pointer transition-colors">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Icon name="MapPin" className="text-accent" />
                        <div>
                          <p className="font-medium">Самовывоз</p>
                          <p className="text-sm text-muted-foreground">
                            Забрать из пункта выдачи
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Адрес доставки *</Label>
                <Textarea
                  id="address"
                  placeholder="Город, улица, дом, квартира"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="rounded-xl min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comment">Комментарий к заказу</Label>
                <Textarea
                  id="comment"
                  placeholder="Дополнительная информация для курьера"
                  value={formData.comment}
                  onChange={(e) => handleInputChange('comment', e.target.value)}
                  className="rounded-xl min-h-[60px]"
                />
              </div>

              <Separator />

              <div className="space-y-3">
                <Label>Способ оплаты</Label>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:border-primary cursor-pointer transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Icon name="CreditCard" className="text-primary" />
                        <div>
                          <p className="font-medium">Банковская карта</p>
                          <p className="text-sm text-muted-foreground">
                            Visa, MasterCard, МИР
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-xl hover:border-primary cursor-pointer transition-colors">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <Icon name="Wallet" className="text-success" />
                        <div>
                          <p className="font-medium">Наличными при получении</p>
                          <p className="text-sm text-muted-foreground">
                            Оплата курьеру или в пункте выдачи
                          </p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 rounded-xl"
              >
                <Icon name="ArrowLeft" className="mr-2" />
                Назад
              </Button>
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={!isStep2Valid}
                className="flex-1 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90"
              >
                Оформить заказ
                <Icon name="CheckCircle2" className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="py-12 text-center space-y-6 animate-scale-in">
            <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <Icon name="CheckCircle2" size={64} className="text-success" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Заказ оформлен!</h3>
              <p className="text-muted-foreground">
                Мы отправили подтверждение на {formData.email}
              </p>
            </div>
            <div className="bg-muted/50 rounded-xl p-6 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Номер заказа:</span>
                <span className="font-semibold">#MP{Date.now().toString().slice(-6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Сумма:</span>
                <span className="font-bold text-primary">{total}₽</span>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
