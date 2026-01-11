import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
  seller: string;
  quantity: number;
  size?: string;
}

interface CartSheetProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

const CartSheet = ({
  open,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}: CartSheetProps) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => {
    const itemPrice = item.discount > 0
      ? Math.round(item.price * (1 - item.discount / 100))
      : item.price;
    return sum + itemPrice * item.quantity;
  }, 0);
  
  const deliveryFee = subtotal >= 2000 ? 0 : 300;
  const total = subtotal + deliveryFee;
  const savings = items.reduce((sum, item) => {
    if (item.discount > 0) {
      const savedPerItem = item.price - Math.round(item.price * (1 - item.discount / 100));
      return sum + savedPerItem * item.quantity;
    }
    return sum;
  }, 0);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-2xl">
            <Icon name="ShoppingCart" className="text-primary" />
            Корзина
            {totalItems > 0 && (
              <Badge className="bg-primary ml-2">{totalItems}</Badge>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <Icon name="ShoppingCart" size={48} className="text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Корзина пуста</h3>
              <p className="text-muted-foreground">
                Добавьте товары, чтобы начать покупки
              </p>
            </div>
            <Button onClick={onClose} className="rounded-xl">
              Перейти к покупкам
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => {
                  const itemPrice = item.discount > 0
                    ? Math.round(item.price * (1 - item.discount / 100))
                    : item.price;

                  return (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-xl border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-muted to-background flex items-center justify-center shrink-0">
                        <span className="text-3xl">{item.image}</span>
                      </div>

                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <h4 className="font-semibold line-clamp-2 text-sm">
                              {item.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {item.seller}
                            </p>
                            {item.size && (
                              <p className="text-xs text-muted-foreground">
                                Размер: {item.size}
                              </p>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onRemoveItem(item.id)}
                            className="h-8 w-8 rounded-lg hover:bg-destructive/10 hover:text-destructive shrink-0"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 border rounded-lg">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                              }
                              className="h-8 w-8 rounded-lg"
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded-lg"
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>

                          <div className="text-right">
                            {item.discount > 0 && (
                              <p className="text-xs text-muted-foreground line-through">
                                {item.price * item.quantity}₽
                              </p>
                            )}
                            <p className="font-bold text-primary">
                              {itemPrice * item.quantity}₽
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>

            <div className="space-y-4 pt-4 border-t">
              {deliveryFee === 0 && subtotal < 2000 ? (
                <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-xl">
                  <Icon name="Truck" size={20} className="text-success" />
                  <p className="text-sm text-success font-medium">
                    Бесплатная доставка при заказе от 2000₽
                  </p>
                </div>
              ) : subtotal >= 2000 ? (
                <div className="flex items-center gap-2 p-3 bg-success/10 border border-success/20 rounded-xl">
                  <Icon name="CheckCircle2" size={20} className="text-success" />
                  <p className="text-sm text-success font-medium">
                    Бесплатная доставка!
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-info/10 border border-info/20 rounded-xl">
                  <Icon name="Info" size={20} className="text-info" />
                  <p className="text-sm text-info font-medium">
                    До бесплатной доставки осталось {2000 - subtotal}₽
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары ({totalItems})</span>
                  <span className="font-medium">{subtotal}₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className={`font-medium ${deliveryFee === 0 ? 'text-success' : ''}`}>
                    {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee}₽`}
                  </span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Скидка</span>
                    <span className="font-medium text-success">-{savings}₽</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого</span>
                  <span className="text-primary">{total}₽</span>
                </div>
              </div>

              <Button
                size="lg"
                onClick={onCheckout}
                className="w-full rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg text-lg py-6"
              >
                Оформить заказ
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
